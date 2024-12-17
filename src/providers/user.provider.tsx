import AuthLayout from '@/components/layout/auth-layout'
import SmallLoader from '@/components/loader/small-loader'
import {Session, User} from 'next-auth'
import {SignInOptions, signIn, signOut, useSession} from 'next-auth/react'
import {useRouter} from 'next/router'
import {ReactElement, ReactNode, createContext, useContext, useEffect, useState} from 'react'

interface IUserContext {
  userInfo: IUserInfo
  session?: Session
  isSignedIn: boolean
  signOut: () => void
  // eslint-disable-next-line no-unused-vars
  signIn: (provider?: string, options?: SignInOptions) => void
  reRender: () => void
}

export interface IUserInfo extends User {
  initials?: string | null
}

const UserContext = createContext<IUserContext>({
  userInfo: {
    id: '',
  },
  isSignedIn: false,
  signOut: () => {},
  signIn: () => {},
  reRender: () => {},
})

const UserProvider = ({children}: {children: ReactNode}): ReactElement => {
  const router = useRouter()
  const {data: session, status} = useSession()
  const [userInfo, setUserInfo] = useState<IUserInfo>({id: ''})
  const [renderState, setRenderState] = useState<number>(0)

  useEffect(() => {
    if (!session || !session.user) {
      return
    }

    if (!userInfo.id) {
      const firstName = (session.user.name || '').split(' ').slice(0, -1).join(' ')
      const lastName = (session.user.name || '').split(' ').slice(-1)[0]

      setUserInfo({
        ...session.user,
        initials: `${firstName[0]}${lastName[0]}`,
      })
      // posthog.identify(session.user.id, {email: session.user.email, name: session.user.name})
    }
  }, [session, renderState])

  const handleSignOut = () => {
    signOut()
    router.push('/')
  }

  return (
    <UserContext.Provider
      value={{
        userInfo,
        signOut: handleSignOut,
        signIn,
        session,
        isSignedIn: !!session,
        reRender: () => setRenderState(renderState + 1),
      }}
    >
      <div key={renderState}>
        {status === 'unauthenticated' && router.pathname === '/' ? (
          children
        ) : ['authenticated', 'loading'].includes(status) && !userInfo ? (
          <AuthLayout>
            <SmallLoader size="medium" center />
          </AuthLayout>
        ) : (
          children
        )}
      </div>
    </UserContext.Provider>
  )
}

export const useUser = (): IUserContext => useContext(UserContext)

export default UserProvider
