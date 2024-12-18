import {Button} from '@/components/ui/button'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import {ChevronDown, Home, Settings} from 'lucide-react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {ReactNode} from 'react'

interface AdminLayoutProps {
  children: ReactNode
}

const AdminLayout = ({children}: AdminLayoutProps) => {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin" className="text-xl font-bold">
                Admin Dashboard
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/admin/home-settings" className="flex items-center space-x-2 text-sm">
                <Settings className="w-4 h-4" />
                <span>Home Settings</span>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/" className="flex items-center">
                      <Home className="mr-2 h-4 w-4" />
                      <span>View Site</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  )
}

export default AdminLayout
