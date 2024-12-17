import {useUser} from '@/providers/user.provider'
import {PinLeftIcon, UpdateIcon} from '@radix-ui/react-icons'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import H1 from '../typography/h1'
import P from '../typography/p'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'
import {Button} from '../ui/button'
import {Sheet, SheetContent, SheetTrigger} from '../ui/sheet'
import Copyright from './copyright'
import Divider from './divider'
import Menu from './menu'

interface IPageLayout {
  title?: string
  subtitle?: string
  children: React.ReactNode
  breadcrumbs?: {
    title: string
    href?: string
  }[]
  actions?: React.ReactNode
  refreshFunc?: () => void
  permission?: string
}

const PageLayout = ({
  title,
  subtitle,
  children,
  refreshFunc,
  actions,
  breadcrumbs = [],
}: IPageLayout): React.ReactElement => {
  const {userInfo, signOut} = useUser()

  // useEffect(() => {
  //   if (!permission || !settings) {
  //     return
  //   }

  //   if (!hasAccess(permission)) {
  //     router.push('/home?a=0')
  //   }
  // }, [settings])

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <Head>
        <title>{`${title ? `${title} - ` : ''} NK Tools`}</title>
      </Head>

      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PinLeftIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="sm:max-w-xs bg-muted-dark border-muted-dark x-white flex flex-1 flex-col gap-y-7"
          >
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/home"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 text-lg font-semibold md:text-base"
              >
                <Image
                  className="h-8 w-auto"
                  src="/images/nk-logo-white.png"
                  alt="NK Installations"
                  width={342}
                  height={287}
                />
              </Link>
            </nav>

            <div className="mt-auto">
              <Copyright navigation />
            </div>
          </SheetContent>
        </Sheet>

        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <BreadcrumbItem key={index}>
                {breadcrumb.href ? (
                  <>
                    <BreadcrumbLink asChild>
                      <Link href={breadcrumb.href}>{breadcrumb.title}</Link>
                    </BreadcrumbLink>

                    <BreadcrumbSeparator />
                  </>
                ) : (
                  <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="relative ml-auto flex-1 md:grow-0">
          {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            /> */}
        </div>

        <Menu
          userInfo={userInfo}
          menuItems={[
            {type: 'item', label: 'Settings', href: '/users/settings'},
            {type: 'item', label: 'Sign out', onClick: signOut},
          ]}
        />
      </header>

      <main className="p-4 sm:px-6 sm:py-0">
        <header className="flex items-center">
          <div className="flex-1">
            <div className="flex sm:items-center mt-2 flex-col sm:flex-row">
              {title && (
                <div className="flex-1 flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <H1 className="flex items-center">
                      {title}
                      {refreshFunc && (
                        <UpdateIcon
                          className="ml-4 w-6 h-6 cursor-pointer hover:text-primary-300 hidden sm:block"
                          onClick={refreshFunc}
                        />
                      )}
                    </H1>

                    {subtitle && <P>{subtitle}</P>}
                  </div>
                </div>
              )}

              {actions}
            </div>

            <Divider />
          </div>
        </header>

        {children}
      </main>
    </div>
  )
}

export default PageLayout
