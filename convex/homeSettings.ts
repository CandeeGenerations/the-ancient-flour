import {v} from 'convex/values'
import {mutation, query} from './_generated/server'

const SETTINGS_TYPE = 'settings'

// Get the home settings
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query('homeSettings')
      .withIndex('by_type')
      .filter((q) => q.eq(q.field('type'), SETTINGS_TYPE))
      .first()
  },
})

// Create or update home settings
export const save = mutation({
  args: {
    headline: v.string(),
    description: v.string(),
    location: v.string(),
    headerImage: v.optional(v.id('_storage')),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('homeSettings')
      .withIndex('by_type')
      .filter((q) => q.eq(q.field('type'), SETTINGS_TYPE))
      .first()

    if (existing) {
      // Update existing settings
      return await ctx.db.patch(existing._id, {
        headline: args.headline,
        description: args.description,
        location: args.location,
        headerImage: args.headerImage,
      })
    } else {
      // Create new settings
      return await ctx.db.insert('homeSettings', {
        type: SETTINGS_TYPE,
        headline: args.headline,
        description: args.description,
        location: args.location,
        headerImage: args.headerImage,
      })
    }
  },
})

// Generate upload URL for header image
export const generateHeaderImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl()
  },
})

// Update header image
export const updateHeaderImage = mutation({
  args: {
    storageId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('homeSettings')
      .withIndex('by_type')
      .filter((q) => q.eq(q.field('type'), SETTINGS_TYPE))
      .first()

    if (existing?.headerImage) {
      // Delete old image if it exists
      await ctx.storage.delete(existing.headerImage)
    }

    if (existing) {
      // Update with new image
      await ctx.db.patch(existing._id, {
        headerImage: args.storageId,
      })
    } else {
      // Create new settings with image
      await ctx.db.insert('homeSettings', {
        type: SETTINGS_TYPE,
        headline: 'Welcome to Keepers at Home',
        description: 'Your digital companion for managing home and family life.',
        location: 'Montclair, VA',
        headerImage: args.storageId,
      })
    }
  },
})

// Get header image URL
export const getHeaderImageUrl = query({
  args: {
    storageId: v.optional(v.id('_storage')),
  },
  handler: async (ctx, args) => {
    if (!args.storageId) return null
    return await ctx.storage.getUrl(args.storageId)
  },
})
