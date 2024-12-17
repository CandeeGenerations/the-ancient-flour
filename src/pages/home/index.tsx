import PageLayout from '@/components/layout/page-layout'
import {api} from '@convex/_generated/api'
import {useQuery} from 'convex/react'
import {useRouter} from 'next/router'
import React, {useEffect} from 'react'
import {toast} from 'sonner'

const HomePage = (): React.ReactElement => {
  const router = useRouter()
  const products = useQuery(api.products.get)

  useEffect(() => {
    const notAuthorized = router.query['a']

    if (notAuthorized && notAuthorized == '0') {
      toast.error('You do not have access to this resource.', {id: 'unauthorized'})
      router.replace(router.pathname, undefined, {shallow: true})
    }
  }, [])

  return (
    <PageLayout title="Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-7 gap-6">
        <div className="sm:col-span-5">{products?.map(({_id, name}) => <div key={_id}>{name}</div>)}</div>
      </div>
    </PageLayout>
  )
}

export default HomePage