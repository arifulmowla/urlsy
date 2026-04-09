<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into urlsy.cc, a Next.js 16.1.6 App Router URL shortener.

**What was set up:**

- `instrumentation-client.ts` — PostHog client-side initialization using the Next.js 15.3+ instrumentation API, with EU cloud host, session replay, and automatic exception capture enabled.
- `lib/posthog-server.ts` — Singleton PostHog Node.js client for server-side event tracking in API routes and server actions.
- `next.config.ts` — Added `/ingest` reverse proxy rewrites routing PostHog traffic through the app (EU endpoints), plus `skipTrailingSlashRedirect: true`.
- `.env.local` — `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` set to project values.
- **12 events** instrumented across 6 files (5 client-side, 2 server-side).
- User identification on sign-in: `posthog.identify()` called server-side in `app/auth/claim/route.ts` with user ID, email, and name from the Google OAuth session.

| Event | Description | File |
|---|---|---|
| `link_shortened` | User shortens a URL via the homepage hero form | `app/components/home/HeroShortenForm.tsx` |
| `link_created` | Authenticated user creates a link in the dashboard | `app/components/dashboard/CreateLinkCard.tsx` |
| `link_copied` | User copies a short link from the dashboard | `app/components/dashboard/DashboardClient.tsx` |
| `link_deleted` | User deletes a short link from the dashboard | `app/components/dashboard/DashboardClient.tsx` |
| `link_analytics_viewed` | User opens the analytics panel for a specific link | `app/components/dashboard/LinksTableCard.tsx` |
| `qr_code_downloaded` | User downloads a QR code PNG | `app/components/dashboard/LinksTableCard.tsx` |
| `upgrade_to_pro_clicked` | User clicks the Upgrade to Pro button | `app/components/dashboard/billing/BillingPlanCard.tsx` |
| `billing_portal_opened` | User successfully opens the Stripe billing portal | `app/components/dashboard/billing/BillingPlanCard.tsx` |
| `yearly_upgrade_scheduled` | User schedules a monthly→yearly upgrade | `app/components/dashboard/billing/BillingPlanCard.tsx` |
| `user_signed_in` | Server-side: user completes Google OAuth sign-in | `app/auth/claim/route.ts` |
| `subscription_completed` | Server-side: Stripe checkout.session.completed webhook | `app/api/stripe/webhook/route.ts` |
| `subscription_cancelled` | Server-side: Stripe customer.subscription.deleted webhook | `app/api/stripe/webhook/route.ts` |

## Next steps

We've built a dashboard and five insights to monitor key business metrics:

- **Dashboard — Analytics basics**: https://eu.posthog.com/project/156374/dashboard/613081

- **Link shortening activity** (homepage vs dashboard volume): https://eu.posthog.com/project/156374/insights/LexfjAux
- **Pro upgrade conversion funnel** (`upgrade_to_pro_clicked` → `subscription_completed`): https://eu.posthog.com/project/156374/insights/akJooHJs
- **New user sign-ins** (daily Google OAuth sign-ins): https://eu.posthog.com/project/156374/insights/2YiiAYEc
- **Dashboard engagement actions** (copies, analytics views, QR downloads): https://eu.posthog.com/project/156374/insights/wS5RbvoY
- **Subscription health** (new subscriptions vs cancellations, weekly): https://eu.posthog.com/project/156374/insights/lnWrlj6i

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
