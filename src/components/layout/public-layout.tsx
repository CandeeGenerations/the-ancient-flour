import {ReactElement} from 'react'

import Copyright from './copyright'

interface PublicLayoutProps {
  children: ReactElement
}

const PublicLayout = ({children}: PublicLayoutProps) => {
  return (
    <div className="min-h-screen pb-10">
      {/* Navbar can go here if needed */}
      <main>{children}</main>

      <Copyright showLogin />
    </div>
  )
}

export default PublicLayout
