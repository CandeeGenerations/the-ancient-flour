import {Copyright} from '@/components/layout'
import {H1} from '@/components/typography'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface IUnauthLayout {
  title?: string
  noCard?: boolean
  children: React.ReactNode
}

const UnauthLayout = ({title, noCard = false, children}: IUnauthLayout): React.ReactElement => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Head>
        <title>{`${title ? `${title} - ` : ''} NK Tools`}</title>
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

        {title && <H1 className="mt-10 text-center text-primary">{title}</H1>}
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[1200px]">
        {noCard ? children : <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">{children}</div>}
      </div>

      <Copyright />
    </div>
  )
}

export default UnauthLayout
