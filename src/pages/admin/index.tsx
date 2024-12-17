import PageLayout from '@/components/layout/page-layout'
import P from '@/components/typography/p'
import {useUser} from '@/providers/user.provider'
import {useRouter} from 'next/router'
import React, {useEffect} from 'react'
import {toast} from 'sonner'

const AdminDashboard = (): React.ReactElement => {
  const router = useRouter()
  const {isSignedIn} = useUser()

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

  return (
    <PageLayout title="Admin Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-7 gap-6">
        <div className="sm:col-span-5">
          <P>Coming soon...</P>
        </div>
      </div>
    </PageLayout>
  )
}

export default AdminDashboard
