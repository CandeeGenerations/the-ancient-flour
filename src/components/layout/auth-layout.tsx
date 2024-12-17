import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import H1 from '../typography/h1'
import Copyright from './copyright'

interface IAuthLayout {
  children: React.ReactNode
}

const AuthLayout = ({children}: IAuthLayout): React.ReactElement => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Head>
        <title>NK Tools</title>
      </Head>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Link href="/">
          <Image
            className="mx-auto h-100 w-auto my-10"
            src="/images/nk-installations-logo.png"
            alt="NK Installations"
            width={1763}
            height={493}
          />
        </Link>

        <H1 className="mt-10 text-center text-primary">Sign in to your account</H1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">{children}</div>
      </div>

      <Copyright />
    </div>
  )
}

export default AuthLayout
