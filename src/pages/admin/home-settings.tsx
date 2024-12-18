import AdminLayout from '@/components/layout/admin-layout'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {api} from '@convex/_generated/api'
import {Id} from '@convex/_generated/dataModel'
import {useMutation, useQuery} from 'convex/react'
import {useRouter} from 'next/router'
import {ReactElement, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'sonner'
import {z} from 'zod'

const formSchema = z.object({
  headline: z.string().min(1, 'Headline is required'),
  description: z.string().min(1, 'Description is required'),
  location: z.string().min(1, 'Location is required'),
})

interface FormValues {
  headline: string
  description: string
  location: string
}

const HomeSettingsPage = () => {
  const router = useRouter()
  const settings = useQuery(api.homeSettings.get)
  const save = useMutation(api.homeSettings.save)
  const generateUploadUrl = useMutation(api.homeSettings.generateHeaderImageUploadUrl)
  const updateHeaderImage = useMutation(api.homeSettings.updateHeaderImage)
  const [isUploading, setIsUploading] = useState(false)

  const headerImageUrl = useQuery(api.homeSettings.getHeaderImageUrl, {
    storageId: settings?.headerImage,
  })

  const form = useForm<FormValues>({
    defaultValues: {
      headline: settings?.headline ?? '',
      description: settings?.description ?? '',
      location: settings?.location ?? '',
    },
  })

  // Update form when settings are loaded
  useEffect(() => {
    if (settings) {
      form.reset({
        headline: settings.headline,
        description: settings.description,
        location: settings.location,
      })
    }
  }, [settings, form])

  const onSubmit = async (data: FormValues) => {
    try {
      await save(data)
      toast.success('Settings saved successfully')
    } catch (error) {
      toast.error('Failed to save settings')
      console.error('Error saving settings:', error)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)

      // Get upload URL
      const uploadUrl = await generateUploadUrl()

      // Upload the file
      const result = await fetch(uploadUrl, {
        method: 'POST',
        headers: {'Content-Type': file.type},
        body: file,
      })

      if (!result.ok) {
        throw new Error('Failed to upload image')
      }

      const {storageId} = await result.json()

      // Update header image
      await updateHeaderImage({storageId: storageId as Id<'_storage'>})

      toast.success('Header image updated successfully')
    } catch (error) {
      toast.error('Failed to upload image')
      console.error('Error uploading image:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Home Page Settings</h1>
        <p className="text-muted-foreground">Manage your home page content and appearance</p>
      </div>

      <div className="grid gap-6">
        {/* Header Image Card */}
        <Card>
          <CardHeader>
            <CardTitle>Header Image</CardTitle>
            <CardDescription>Upload a header image for your home page</CardDescription>
          </CardHeader>
          <CardContent>
            {settings?.headerImage && headerImageUrl && (
              <div className="aspect-[21/9] relative mb-4 rounded-lg overflow-hidden bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={headerImageUrl} alt="Header" className="object-cover w-full h-full" />
              </div>
            )}
            <div>
              <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
              <p className="text-sm text-muted-foreground mt-2">
                Recommended size: 2100x900 pixels (21:9 aspect ratio)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Content Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle>Content Settings</CardTitle>
            <CardDescription>Edit your home page content</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="headline"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Headline</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter headline" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter description" className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Save Changes</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

HomeSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default HomeSettingsPage
