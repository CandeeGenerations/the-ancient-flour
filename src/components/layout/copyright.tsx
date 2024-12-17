import {cn} from '@/lib/utils'
import {getYear} from 'date-fns'
import React from 'react'

import {ExternalA} from '../typography/a'
import P from '../typography/p'

export interface ICopyright {
  navigation?: boolean
}

const Copyright = ({navigation = false}: ICopyright): React.ReactElement => {
  const version = process.env.NEXT_PUBLIC_APP_VERSION

  return (
    <div className={cn(navigation ? 'text-xs text-left' : 'text-center mt-10', 'space-y-1')}>
      <P className={cn(navigation && 'text-muted')}>Copyright &copy; {getYear(new Date())}</P>

      <P className={cn(navigation && 'text-muted')}>
        Powered by{' '}
        <ExternalA href="https://candeegenerations.com" target="_blank" rel="noreferrer noopener">
          Candee Generations
        </ExternalA>
      </P>

      <P className={cn(navigation && 'text-muted')}>All rights reserved. (v{version || '_dev'})</P>
    </div>
  )
}

export default Copyright
