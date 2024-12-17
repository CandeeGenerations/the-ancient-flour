import Button from '@/components/button'
import UnAuthLayout from '@/components/layout/unauth-layout'
import {api} from '@convex/_generated/api'
import {useQuery} from 'convex/react'
import {useRouter} from 'next/router'
import {ReactElement} from 'react'

const HomePage = () => {
  const router = useRouter()
  const products = useQuery(api.products.get)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to Keepers at Home</h1>

      <p className="text-lg mb-8 text-center max-w-2xl">Your digital companion for managing home and family life.</p>

      {products?.map(({_id, name}) => <div key={_id}>{name}</div>)}

      <div className="space-x-4">
        <Button onClick={() => router.push('/admin')} size="lg">
          Admin Login
        </Button>
      </div>
    </div>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <UnAuthLayout>{page}</UnAuthLayout>
}

export default HomePage
