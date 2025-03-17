import {getYear} from 'date-fns'
import React from 'react'

import {A, P} from '../typography'

export interface ICopyright {
  navigation?: boolean
  showLogin?: boolean
}

const Copyright = ({showLogin = false}: ICopyright): React.ReactElement => {
  const version = process.env.NEXT_PUBLIC_APP_VERSION

  return (
    <div className="text-center mt-10 space-y-1">
      <P>Copyright &copy; {getYear(new Date())}</P>

      <P>
        Powered by{' '}
        <A href="https://candeegenerations.com" target="_blank" rel="noreferrer noopener">
          Candee Generations
        </A>
      </P>

      <P>All rights reserved. (v{version || '_dev'})</P>

      {showLogin && (
        <P>
          <A href="/admin" target="_blank" rel="noreferrer noopener">
            Admin login
          </A>
        </P>
      )}
    </div>
  )
}

export default Copyright
