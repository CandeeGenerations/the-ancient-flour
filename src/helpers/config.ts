/* eslint-disable no-undef */
const config = {
  azure: {
    clientId: process.env.AZURE_AD_CLIENT_ID,
    clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
    tenantId: process.env.AZURE_AD_TENANT_ID,
  },
  auth: {
    url: process.env.NEXTAUTH_URL,
  },
  convex: {
    url: process.env.NEXT_PUBLIC_CONVEX_URL,
  },
  env: process.env.NODE_ENV,
  url: process.env.NEXT_PUBLIC_URL,
  lightboxKey: process.env.NEXT_PUBLIC_LIGHTBOX_KEY,
  postHog: {
    key: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    apiHost: process.env.NEXT_PUBLIC_POSTHOG_API_HOST,
  },
}

export default config
