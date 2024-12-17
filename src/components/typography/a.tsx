import {cn} from '@/lib/utils'
import type {LinkProps} from 'next/link'
import Link from 'next/link'
import React from 'react'

type AProps = Omit<LinkProps, 'className' | 'onClick'> & {
  className?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  children: React.ReactNode
}

const cssClasses = 'underline underline-offset-4 text-secondary hover:text-secondary-800'

const A = ({onClick, className, children, ...props}: AProps): React.ReactElement => {
  return (
    <Link onClick={onClick} className={cn(cssClasses, className)} {...props}>
      {children}
    </Link>
  )
}

export const ExternalA = ({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>): React.ReactElement => (
  <a className={cn(cssClasses, className)} rel="noopener noreferrer" target="_blank" {...props}>
    {children}
  </a>
)

export default A
