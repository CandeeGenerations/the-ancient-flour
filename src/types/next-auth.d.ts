import NextAuth, {User} from 'next-auth'

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const temp = NextAuth

declare module 'next-auth' {
  interface Session {
    user: User & {
      id?: string
    }
  }
}
