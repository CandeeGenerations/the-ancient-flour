import AuthLayout from '@/components/layout/auth-layout'
import SmallLoader from '@/components/loader/small-loader'
import SignIn from '@/pages/auth/signin'
import {useUser} from '@/providers/user.provider'
import {useRouter} from 'next/router'
import {ReactElement, useEffect} from 'react'

const StartPage = () => {
  const router = useRouter()
  const {isSignedIn} = useUser()

  useEffect(() => {
    if (isSignedIn) {
      router.push('/home')
    }
  }, [isSignedIn])

  return isSignedIn ? <SmallLoader size="medium" center /> : <SignIn />
}

StartPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}

export default StartPage
