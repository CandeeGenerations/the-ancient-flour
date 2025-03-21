import {cn} from '@/lib/utils'
import React from 'react'

const H2 = ({children, className, ...props}: React.HTMLAttributes<HTMLHeadingElement>): React.ReactElement => {
  return (
    <h2
      className={cn('scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0', className)}
      {...props}
    >
      {children}
    </h2>
  )
}

export default H2
