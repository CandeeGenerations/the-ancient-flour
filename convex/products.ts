import {v} from 'convex/values'
import {mutation, query} from './_generated/server'
import {Id} from './_generated/dataModel'

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('products').collect()
  },
})

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl()
  },
})

export const addProductImage = mutation({
  args: {
    productId: v.id('products'),
    storageId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId)
    if (!product) throw new Error('Product not found')

    const currentImages = product.images || []
    await ctx.db.patch(args.productId, {
      images: [...currentImages, args.storageId],
    })
  },
})

export const removeProductImage = mutation({
  args: {
    productId: v.id('products'),
    storageId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId)
    if (!product) throw new Error('Product not found')

    const updatedImages = product.images.filter(id => id !== args.storageId)
    await ctx.db.patch(args.productId, {
      images: updatedImages,
    })

    // Delete the image from storage
    await ctx.storage.delete(args.storageId)
  },
})

export const reorderProductImages = mutation({
  args: {
    productId: v.id('products'),
    imageIds: v.array(v.id('_storage')),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.productId, {
      images: args.imageIds,
    })
  },
})

// Helper function to get image URLs
export const getImageUrls = query({
  args: {
    storageIds: v.array(v.id('_storage')),
  },
  handler: async (ctx, args) => {
    const urls = await Promise.all(
      args.storageIds.map(async (id) => ({
        id,
        url: await ctx.storage.getUrl(id),
      }))
    )
    return urls
  },
})
