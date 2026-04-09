import fs from "node:fs";
import path from "node:path";
import {
  blogPosts,
  comparisonPages,
  featurePages,
  useCasePages,
  type MarketingLink,
} from "../lib/marketing-content";

type SeoEntry = {
  route: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: string;
  publishedAt: string;
  updatedAt: string;
  authorName: string;
  relatedLinks: MarketingLink[];
};

const errors: string[] = [];

function hasPath(links: MarketingLink[], prefix: string) {
  return links.some((link) => link.href.startsWith(prefix));
}

function hasSignup(links: MarketingLink[]) {
  return links.some((link) => link.href === "/login" || link.href === "/dashboard");
}

function assertSeoFields(entry: SeoEntry) {
  if (!entry.primaryKeyword.trim()) errors.push(`${entry.route}: missing primaryKeyword`);
  if (!entry.secondaryKeywords.length) errors.push(`${entry.route}: missing secondaryKeywords`);
  if (!entry.searchIntent.trim()) errors.push(`${entry.route}: missing searchIntent`);
  if (!entry.publishedAt.trim()) errors.push(`${entry.route}: missing publishedAt`);
  if (!entry.updatedAt.trim()) errors.push(`${entry.route}: missing updatedAt`);
  if (!entry.authorName.trim()) errors.push(`${entry.route}: missing authorName`);
}

const moneyPages: SeoEntry[] = [
  ...featurePages.map((page) => ({ ...page, route: `/features/${page.slug}` })),
  ...comparisonPages.map((page) => ({ ...page, route: `/compare/${page.slug}` })),
  ...useCasePages.map((page) => ({ ...page, route: `/use-cases/${page.slug}` })),
];

const blogEntries: SeoEntry[] = blogPosts.map((post) => ({ ...post, route: `/blog/${post.slug}` }));

for (const page of [...moneyPages, ...blogEntries]) {
  assertSeoFields(page);
}

const primaryKeywordOwner = new Map<string, string>();
for (const page of [...moneyPages, ...blogEntries]) {
  const normalized = page.primaryKeyword.toLowerCase().trim();
  if (!normalized) continue;
  const existing = primaryKeywordOwner.get(normalized);
  if (existing) {
    errors.push(`duplicate primaryKeyword "${normalized}" on ${existing} and ${page.route}`);
  } else {
    primaryKeywordOwner.set(normalized, page.route);
  }
}

if (primaryKeywordOwner.get("url shortener")) {
  errors.push('homepage must exclusively own "url shortener"; remove from detail pages');
}

for (const page of moneyPages) {
  if (!hasPath(page.relatedLinks, "/features/")) errors.push(`${page.route}: must link to at least one /features/ page`);
  if (!hasPath(page.relatedLinks, "/compare/")) errors.push(`${page.route}: must link to at least one /compare/ page`);
  if (!hasPath(page.relatedLinks, "/use-cases/")) errors.push(`${page.route}: must link to at least one /use-cases/ page`);
  if (!hasPath(page.relatedLinks, "/blog/")) errors.push(`${page.route}: must link to at least one /blog/ page`);
  if (!hasSignup(page.relatedLinks)) errors.push(`${page.route}: must include /login or /dashboard CTA link`);
}

for (const page of blogEntries) {
  const hasMoney = hasPath(page.relatedLinks, "/features/") || hasPath(page.relatedLinks, "/compare/") || hasPath(page.relatedLinks, "/use-cases/");
  if (!hasMoney) errors.push(`${page.route}: must link to at least one money page`);
  if (!hasPath(page.relatedLinks, "/compare/")) errors.push(`${page.route}: must link to at least one /compare/ page`);
}

const sitemapPath = path.resolve(process.cwd(), "app/sitemap.ts");
const sitemapSource = fs.readFileSync(sitemapPath, "utf8");
if (!sitemapSource.includes("/use-cases")) {
  errors.push("sitemap.ts: missing /use-cases route");
}
if (!sitemapSource.includes("useCasePages.map")) {
  errors.push("sitemap.ts: missing useCasePages.map dynamic entries");
}
if (!sitemapSource.includes("/features")) {
  errors.push("sitemap.ts: missing /features index route");
}

const robotsPath = path.resolve(process.cwd(), "app/robots.ts");
const robotsSource = fs.readFileSync(robotsPath, "utf8");
const robotsDisallowLogin = /disallow:\s*\[[^\]]*["']\/login["'][^\]]*\]/m.test(
  robotsSource,
);
const sitemapIncludesLogin = /\/login/.test(sitemapSource);

if (robotsDisallowLogin && sitemapIncludesLogin) {
  errors.push("sitemap.ts: must not include /login when robots.ts disallows /login");
}

if (errors.length) {
  console.error("SEO check failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("SEO check passed: metadata fields, keyword ownership, linking, and sitemap coverage look valid.");
