import config from '@/helpers/config'
import {ConvexProvider, ConvexReactClient} from 'convex/react'
import {ReactNode} from 'react'

const convex = new ConvexReactClient(config.convex.url)

const ConvexClientProvider = ({children}: {children: ReactNode}) => (
  <ConvexProvider client={convex}>{children}</ConvexProvider>
)

export default ConvexClientProvider
