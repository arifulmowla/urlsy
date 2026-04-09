"use client";

import { Fragment, useState } from "react";
import posthog from "posthog-js";
import { EmptyLinksState } from "@/app/components/dashboard/EmptyLinksState";
import { LinkAnalyticsPanel } from "@/app/components/dashboard/LinkAnalyticsPanel";
import type { DashboardLinkItem } from "@/lib/dashboard-types";

type LinksTableCardProps = {
  plan: "FREE" | "PRO";
  links: DashboardLinkItem[];
  pendingDeleteId: string;
  copiedCode: string;
  onDelete: (id: string) => void;
  onCopy: (code: string) => void;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function LinksTableCard({
  plan,
  links,
  pendingDeleteId,
  copiedCode,
  onDelete,
  onCopy,
}: LinksTableCardProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [qrUrl, setQrUrl] = useState<string | null>(null);

  function toggleAnalytics(linkId: string) {
    const isOpening = expandedId !== linkId;
    setExpandedId((prev) => (prev === linkId ? null : linkId));
    if (isOpening) {
      posthog.capture("link_analytics_viewed", { link_id: linkId });
    }
  }

  async function openQr(code: string) {
    const origin = window.location.origin;
    setQrCode(code);
    setQrUrl(`${origin}/q/${code}`);
  }

  async function downloadQr() {
    if (!qrUrl || !qrCode) return;
    const response = await fetch(qrUrl);
    if (!response.ok) return;
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${qrCode}-qr.png`;
    link.click();
    URL.revokeObjectURL(url);
    posthog.capture("qr_code_downloaded", { short_code: qrCode });
  }

  if (links.length === 0) {
    return (
      <section className="brutal-card brutal-card-muted p-5 sm:p-6">
        <EmptyLinksState
          onCreateClick={() => {
            const el = document.getElementById("create-link");
            el?.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
        />
      </section>
    );
  }

  return (
    <section className="brutal-card brutal-card-muted p-5 sm:p-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-2xl font-bold tracking-tight">Your links</h2>
        <p className="text-sm text-[var(--text-muted)]">{links.length} total</p>
      </div>

      <div className="mt-4 grid gap-3 md:hidden">
        {links.map((link) => (
          <div
            key={link.id}
            className="border-2 border-[var(--stroke)] bg-[#f8f8f4] p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                  Short link
                </p>
                <p className="mt-1 text-sm font-semibold">{link.code}</p>
              </div>
              <button
                type="button"
                onClick={() => onCopy(link.code)}
                className="focus-ring brutal-pill border-2 px-3 py-1 text-xs font-semibold"
              >
                {copiedCode === link.code ? "Copied" : "Copy"}
              </button>
            </div>

            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
              Target
            </p>
            <p className="mt-1 truncate text-sm text-[var(--text-muted)]">{link.targetUrl}</p>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                  Clicks
                </p>
                <p className="mt-1 font-semibold">{link.clickCount}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                  Expiry
                </p>
                <p className="mt-1 text-[var(--text-muted)]">
                  {link.expiresAt ? formatDate(link.expiresAt) : "Never"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                  Created
                </p>
                <p className="mt-1 text-[var(--text-muted)]">{formatDate(link.createdAt)}</p>
              </div>
              <div className="flex items-end justify-end">
                <button
                  type="button"
                  onClick={() => onDelete(link.id)}
                  disabled={pendingDeleteId === link.id}
                className="focus-ring brutal-pill border-2 border-red-400 px-3 py-1 text-xs font-semibold text-red-700 disabled:opacity-60"
                >
                  {pendingDeleteId === link.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => toggleAnalytics(link.id)}
                className={`focus-ring brutal-toggle px-3 py-1 text-xs ${
                  expandedId === link.id ? "brutal-toggle-active" : ""
                }`}
              >
                {expandedId === link.id ? "Hide analytics" : "View analytics"}
              </button>
              <button
                type="button"
                onClick={() => openQr(link.code)}
                className="focus-ring brutal-pill border-2 px-3 py-1 text-xs font-semibold"
              >
                QR
              </button>
              {plan === "FREE" && (
                <span className="brutal-pill border-2 bg-[var(--bg-hero)] px-2 py-1 text-[10px] font-semibold text-[var(--text-primary)]">
                  Pro
                </span>
              )}
            </div>

            {expandedId === link.id && <LinkAnalyticsPanel plan={plan} linkId={link.id} />}
          </div>
        ))}
      </div>

      <div className="mt-4 hidden overflow-x-auto md:block">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
              <th className="px-3 py-2">Short</th>
              <th className="px-3 py-2">Target</th>
              <th className="px-3 py-2">Clicks</th>
              <th className="px-3 py-2">Expiry</th>
              <th className="px-3 py-2">Created</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <Fragment key={link.id}>
                <tr className="border-2 border-[var(--stroke)] bg-[#f8f8f4] text-sm">
                  <td className="px-3 py-3 font-semibold">{link.code}</td>
                  <td className="max-w-xs truncate px-3 py-3 text-[var(--text-muted)]">
                    {link.targetUrl}
                  </td>
                  <td className="px-3 py-3 font-semibold">{link.clickCount}</td>
                  <td className="px-3 py-3 text-[var(--text-muted)]">
                    {link.expiresAt ? formatDate(link.expiresAt) : "Never"}
                  </td>
                  <td className="px-3 py-3 text-[var(--text-muted)]">{formatDate(link.createdAt)}</td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onCopy(link.code)}
                        className="focus-ring brutal-pill border-2 px-3 py-1 text-xs font-semibold"
                      >
                        {copiedCode === link.code ? "Copied" : "Copy"}
                      </button>
                      <button
                        type="button"
                        onClick={() => openQr(link.code)}
                        className="focus-ring brutal-pill border-2 px-3 py-1 text-xs font-semibold"
                      >
                        QR
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleAnalytics(link.id)}
                        className={`focus-ring brutal-toggle px-3 py-1 text-xs ${
                          expandedId === link.id ? "brutal-toggle-active" : ""
                        }`}
                      >
                        {expandedId === link.id ? "Hide analytics" : "Analytics"}
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(link.id)}
                        disabled={pendingDeleteId === link.id}
                        className="focus-ring brutal-pill border-2 border-red-400 px-3 py-1 text-xs font-semibold text-red-700 disabled:opacity-60"
                      >
                        {pendingDeleteId === link.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedId === link.id && (
                  <tr className="text-sm">
                    <td colSpan={6} className="px-3 pb-3">
                      <LinkAnalyticsPanel plan={plan} linkId={link.id} />
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {qrCode && qrUrl && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 p-4">
          <div className="brutal-card brutal-card-muted w-full max-w-sm p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">QR code</h3>
              <button
                type="button"
                onClick={() => {
                  setQrCode(null);
                  setQrUrl(null);
                }}
                className="focus-ring brutal-pill border-2 px-3 py-1 text-xs font-semibold"
              >
                Close
              </button>
            </div>

            <div className="mt-4 flex flex-col items-center gap-4">
              <img src={qrUrl} alt={`QR code for ${qrCode}`} className="h-44 w-44 border-2 border-[var(--stroke)] bg-white p-1" />
              <button
                type="button"
                onClick={downloadQr}
                className="brutal-btn brutal-btn-sm brutal-btn-primary focus-ring hover-lift"
              >
                Download PNG
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
