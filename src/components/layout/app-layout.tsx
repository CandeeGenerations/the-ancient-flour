import {cn} from '@/lib/utils'
import {DoubleArrowUpIcon, InfoCircledIcon} from '@radix-ui/react-icons'
import _debounce from 'lodash/debounce'
import Link from 'next/link'
import React, {useEffect, useRef, useState} from 'react'

import Copyright from './copyright'
import Tooltip from './tooltip'

interface ILayout {
  children: React.ReactNode
}

const AppLayout = ({children}: ILayout): React.ReactElement => {
  const scrollableRef = useRef<HTMLDivElement | null>(null)
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false)

  const handleScroll = () => {
    if (scrollableRef.current) {
      setShowScrollButton(scrollableRef.current.scrollTop > 0)
    }
  }

  const handleScrollToTop = () => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTo({top: 0, behavior: 'smooth'})
    }
  }

  const handleDebounceScroll = _debounce(handleScroll, 100)

  useEffect(() => {
    handleScroll()
  }, [])

  return (
    <div
      className="flex h-screen w-full flex-col relative overflow-auto"
      onScroll={handleDebounceScroll}
      ref={scrollableRef}
    >
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-muted-dark sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Link
            href="/home"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 font-semibold  md:h-8 md:w-8 md:text-base"
          >
            KAT
          </Link>
        </nav>

        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
          <Tooltip
            contentProps={{className: 'bg-muted-dark py-4', side: 'right'}}
            trigger={
              <span className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-muted-foreground text-muted-foreground">
                <InfoCircledIcon className="h-5 w-5" />
                <span className="sr-only">Info</span>
              </span>
            }
          >
            <Copyright navigation />
          </Tooltip>
        </nav>
      </aside>

      {children}

      <div
        className={cn(
          !showScrollButton && 'opacity-0',
          'fixed flex justify-end bottom-0 right-0 transition duration-300',
        )}
      >
        <div className="text-primary-300 hover:text-primary transition">
          <button onClick={handleScrollToTop} className="bg-gray-100 p-2 rounded-tl-md">
            <DoubleArrowUpIcon className="h-7 w-7" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AppLayout
