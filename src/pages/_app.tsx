import AppLayout from '@/components/layout/app-layout'
import {TooltipProvider} from '@/components/ui/tooltip'
import ConvexClientProvider from '@/providers/convex.provider'
import UserProvider from '@/providers/user.provider'
import '@/styles/globals.css'
import {NextPage} from 'next'
import {SessionProvider} from 'next-auth/react'
import type {AppProps} from 'next/app'
import {ReactElement, ReactNode} from 'react'
import {Toaster} from 'sonner'

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

// if (typeof window !== 'undefined') {
//   // checks that we are client-side
//   posthog.init(config.postHog.key, {
//     api_host: config.postHog.apiHost,
//     ui_host: config.postHog.host,
//     person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
//     loaded: (posthog) => {
//       if (config.env === 'development') {
//         posthog.debug() // debug mode in development
//       }
//     },
//   })
// }

export default function App({Component, pageProps: {session, ...pageProps}}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <AppLayout>{page}</AppLayout>)

  return (
    // <PostHogProvider client={posthog}>
    <ConvexClientProvider>
      <SessionProvider session={session}>
        <UserProvider>
          <Toaster position="bottom-right" expand={false} closeButton richColors />

          <TooltipProvider>{getLayout(<Component {...pageProps} />)}</TooltipProvider>
        </UserProvider>
      </SessionProvider>
    </ConvexClientProvider>
    // </PostHogProvider>
  )
}
