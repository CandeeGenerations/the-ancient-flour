import Head from 'next/head'
import React from 'react'

import H1 from '../typography/h1'
import Copyright from './copyright'

interface IUnauthLayout {
  title?: string
  noCard?: boolean
  children: React.ReactNode
}

const UnauthLayout = ({title, noCard = false, children}: IUnauthLayout): React.ReactElement => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Head>
        <title>{`${title ? `${title} - ` : ''} Keepers at Home`}</title>
      </Head>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
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
