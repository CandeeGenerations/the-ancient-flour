import Button from '@/components/button'
import UnauthLayout from '@/components/layout/unauth-layout'
import Link from 'next/link'
import React, {ReactElement} from 'react'

const FourOhFour = (): React.ReactElement => {
  return (
    <div className="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl override serpentine-font text-primary sm:text-5xl">404</p>

          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-muted-light sm:pl-6">
              <h1 className="text-4xl override serpentine-font text-muted-dark tracking-tight sm:text-5xl">
                Page not found
              </h1>

              <p className="mt-1 text-muted0">Please check the URL in the address bar and try again.</p>
            </div>

            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link href="/home">
                <Button>Go back home</Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
FourOhFour.getLayout = function getLayout(page: ReactElement) {
  return <UnauthLayout noCard>{page}</UnauthLayout>
}

export default FourOhFour
