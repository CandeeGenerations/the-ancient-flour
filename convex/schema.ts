import {defineSchema, defineTable} from 'convex/server'
import {v} from 'convex/values'

export default defineSchema({
  products: defineTable({
    title: v.string(),
    minimumQuantity: v.string(),
    price: v.number(),
    description: v.optional(v.string()),
    featured: v.boolean(),
    hidden: v.boolean(),
    category: v.string(),
    images: v.optional(v.array(v.id('_storage'))),
  }),
  homeSettings: defineTable({
    type: v.string(),
    headline: v.string(),
    description: v.string(),
    location: v.string(),
    headerImage: v.optional(v.id('_storage')),
  }).index('by_type', ['type']), // Use type field to ensure singleton
})
