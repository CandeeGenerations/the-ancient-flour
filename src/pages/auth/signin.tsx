import Button from '@/components/button'
import WindowsIcon from '@/components/icons/windows-icon'
import AuthLayout from '@/components/layout/auth-layout'
import SmallLoader from '@/components/loader/small-loader'
import A from '@/components/typography/a'
import H2 from '@/components/typography/h2'
import P from '@/components/typography/p'
import {authOptions} from '@/pages/api/auth/[...nextauth]'
import {useUser} from '@/providers/user.provider'
import type {GetServerSidePropsContext} from 'next'
import {getServerSession} from 'next-auth/next'
import Head from 'next/head'
import React from 'react'

export default function SignIn() {
  const {signIn} = useUser()
  const [loading, setLoading] = React.useState<boolean>(false)

  return loading ? (
    <>
      <Head>
        <title>Signing you in... - NK Tools</title>
      </Head>

      <div className="mt-6 space-y-4">
        <H2 className="mb-8 text-center text-primary">Signing you in...</H2>

        <SmallLoader size="medium" />
      </div>
    </>
  ) : (
    <>
      <Head>
        <title>Sign in - NK Tools</title>
      </Head>

      <P className="text-center mb-10">Sign in securely using your Office 365 account.</P>

      <Button
        size="lg"
        onClick={() => {
          setLoading(true)
          signIn('azure-ad')
        }}
        block
        className="!bg-[#2E2E2E] text-white !border-[#2E2E2E] hover:bg-[#2E2E2E] !ring-[#2E2E2E]"
      >
        <WindowsIcon className="mr-2 w-4" /> Office 365
      </Button>

      <P className="text-center !mt-10">
        If you encounter any issues while signing in or have any questions, our support team is here to help. Feel free
        to reach out to us at <A href="mailto:supportdesk@nkinstallations.com">supportdesk@nkinstallations.com</A>.
      </P>
    </>
  )
}

SignIn.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return {redirect: {destination: '/home'}}
  }

  return {
    props: {},
  }
}
