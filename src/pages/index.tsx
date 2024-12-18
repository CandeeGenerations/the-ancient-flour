import Button from '@/components/button'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import {api} from '@convex/_generated/api'
import {useQuery} from 'convex/react'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {ReactElement, useMemo} from 'react'

import {PublicLayout} from '../components/layout/public-layout'

const HomePage = () => {
  const router = useRouter()
  const products = useQuery(api.products.get)
  const settings = useQuery(api.homeSettings.get)
  const headerImageUrl = useQuery(api.homeSettings.getHeaderImageUrl, {
    storageId: settings?.headerImage,
  })
  const featuredProducts = products?.filter((product) => product.featured) ?? []

  // Get all image IDs from featured products
  const imageIds = useMemo(() => {
    return featuredProducts
      .map((product) => product.images?.[0])
      .filter((id): id is NonNullable<typeof id> => id !== undefined)
  }, [featuredProducts])

  // Get all image URLs in one query
  const imageUrls = useQuery(api.products.getImageUrls, {storageIds: imageIds})

  // Create a map of image IDs to URLs for easy lookup
  const imageUrlMap = useMemo(() => {
    return new Map(imageUrls?.map(({id, url}) => [id, url]))
  }, [imageUrls])

  return (
    <PublicLayout>
      <div className="min-h-screen">
        {/* Header Section */}
        <div className="relative w-full">
          <div className="aspect-[21/9] relative w-full bg-[#1a2c34]">
            {headerImageUrl && (
              <Image src={headerImageUrl} alt="Keepers at Home" fill className="object-cover opacity-50" priority />
            )}

            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-[rgba(39,39,42,0.48)]">
              {settings?.location && (
                <span className="bg-white/90 text-gray-900 px-4 py-1 rounded-full text-sm mb-8">
                  Based in {settings.location}
                </span>
              )}

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 text-center font-bold">
                {settings?.headline ?? 'My shop'}
              </h1>

              <p className="text-lg md:text-xl text-white/90 max-w-3xl text-center mb-8">
                {settings?.description ?? 'Order your favorite products from our online store.'}
              </p>

              <Button onClick={() => router.push('/products')}>View Products</Button>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="w-full max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product._id} className="w-full">
                <CardHeader>
                  <CardTitle>{product.title}</CardTitle>

                  <CardDescription>{product.minimumQuantity}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="aspect-square relative mb-4">
                    {product.images?.[0] && imageUrlMap?.get(product.images[0]) && (
                      <Image
                        src={imageUrlMap.get(product.images[0]) ?? ''}
                        alt={product.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                </CardContent>

                <CardFooter className="justify-between">
                  <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
                  <Button onClick={() => router.push(`/products/${product._id}`)}>View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Admin Button */}
        <div className="py-8">
          <Button onClick={() => router.push('/admin')} size="lg">
            Admin Login
          </Button>
        </div>
      </div>
    </PublicLayout>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>
}

export default HomePage
