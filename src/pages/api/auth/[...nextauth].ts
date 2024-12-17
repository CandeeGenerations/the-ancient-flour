import config from '@/helpers/config'
import clientPromise from '@/pages/api/auth/_mongo'
import {MongoDBAdapter} from '@next-auth/mongodb-adapter'
import NextAuth, {AuthOptions} from 'next-auth'
import AzureADProvider from 'next-auth/providers/azure-ad'

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: '/auth/signin',
  },
  providers: [AzureADProvider({...config.azure})],
  callbacks: {
    async session({session, token}) {
      session.user.id = token.userId as string | undefined

      return session
    },
    async jwt({token, user}) {
      if (user && user.id) {
        token.userId = user.id
      }

      return token
    },
  },
}

export default NextAuth(authOptions)
