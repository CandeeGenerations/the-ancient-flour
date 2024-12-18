import AdminLayout from '@/components/layout/admin-layout'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {useUser} from '@/providers/user.provider'
import {api} from '@convex/_generated/api'
import {useQuery} from 'convex/react'
import {Package, Settings, ShoppingCart} from 'lucide-react'
import {useRouter} from 'next/router'
import {ReactElement, useEffect} from 'react'
import {toast} from 'sonner'

const AdminDashboard = () => {
  const router = useRouter()
  const {isSignedIn} = useUser()
  const products = useQuery(api.products.get)
  const settings = useQuery(api.homeSettings.get)

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/auth/signin?redirect=/admin')
    }
  }, [isSignedIn])

  useEffect(() => {
    const notAuthorized = router.query['a']

    if (notAuthorized && notAuthorized == '0') {
      toast.error('You do not have access to this resource.', {id: 'unauthorized'})
      router.replace(router.pathname, undefined, {shallow: true})
    }
  }, [])

  if (!isSignedIn) {
    return null
  }

  const featuredProducts = products?.filter((p) => p.featured).length ?? 0
  const totalProducts = products?.length ?? 0

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Products Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">Products in catalog</p>
          </CardContent>
        </Card>

        {/* Featured Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured Products</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{featuredProducts}</div>
            <p className="text-xs text-muted-foreground">Products featured on home page</p>
          </CardContent>
        </Card>

        {/* Home Settings Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Home Settings</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{settings ? 'Configured' : 'Not Set'}</div>
            <p className="text-xs text-muted-foreground">
              {settings?.headerImage ? 'Header image uploaded' : 'No header image'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="cursor-pointer" onClick={() => router.push('/admin/home-settings')}>
            <CardHeader>
              <CardTitle>Home Settings</CardTitle>
              <CardDescription>Manage your home page content and appearance</CardDescription>
            </CardHeader>
          </Card>
          {/* Add more quick action cards here */}
        </div>
      </div>
    </div>
  )
}

AdminDashboard.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default AdminDashboard
