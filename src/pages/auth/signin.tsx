import {Button} from '@/components/button'
import WindowsIcon from '@/components/icons/windows-icon'
import {AuthLayout, SmallLoader} from '@/components/layout'
import {A, H2, P} from '@/components/typography'
import {authOptions} from '@/pages/api/auth/[...nextauth]'
import {useUser} from '@/providers/user.provider'
import type {GetServerSidePropsContext} from 'next'
import {getServerSession} from 'next-auth/next'
import Head from 'next/head'
import {useRouter} from 'next/router'
import React, {useEffect} from 'react'

export default function SignIn() {
  const {signIn, isSignedIn} = useUser()
  const [loading, setLoading] = React.useState<boolean>(false)
  const router = useRouter()
  const {redirect} = router.query

  useEffect(() => {
    if (isSignedIn) {
      router.push((redirect as string) || '/admin')
    }
  }, [isSignedIn, redirect])

  return loading ? (
    <>
      <Head>
        <title>Signing you in... - Keepers at Home</title>
      </Head>

      <div className="mt-6 space-y-4">
        <H2 className="mb-8 text-center text-primary">Signing you in...</H2>
        <SmallLoader size="medium" />
      </div>
    </>
  ) : (
    <>
      <Head>
        <title>Admin Sign in - Keepers at Home</title>
      </Head>

      <P className="text-center mb-10">Sign in to access the admin dashboard.</P>

      <Button
        size="lg"
        onClick={() => {
          setLoading(true)
          signIn('azure-ad')
        }}
        block
        className="!bg-[#2E2E2E] text-white !border-[#2E2E2E] hover:bg-[#2E2E2E] !ring-[#2E2E2E]"
      >
        <WindowsIcon className="mr-2 w-4" /> Sign in with Office 365
      </Button>

      <P className="text-center !mt-10">
        <A href="/">Return to Home Page</A>
      </P>
    </>
  )
}

SignIn.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: context.query.redirect || '/admin',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
