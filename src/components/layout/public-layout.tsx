import {ReactElement} from 'react'

interface PublicLayoutProps {
  children: ReactElement
}

export function PublicLayout({children}: PublicLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Navbar can go here if needed */}
      <main>{children}</main>
      {/* Footer can go here if needed */}
    </div>
  )
}
