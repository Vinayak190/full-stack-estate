import prisma from '../lib/prisma.js'

const cleanupSavedPosts = async () => {
  try {
    // Get all saved posts
    const savedPosts = await prisma.savedPost.findMany()

    // Create a map to track unique combinations
    const seen = new Map()
    const duplicates = []

    // Find duplicates
    savedPosts.forEach((post) => {
      const key = `${post.userId}-${post.postId}`
      if (seen.has(key)) {
        duplicates.push(post.id)
      } else {
        seen.set(key, post.id)
      }
    })

    // Delete duplicate entries
    if (duplicates.length > 0) {
      await prisma.savedPost.deleteMany({
        where: {
          id: {
            in: duplicates,
          },
        },
      })
      console.log(`Deleted ${duplicates.length} duplicate entries`)
    } else {
      console.log('No duplicates found')
    }
  } catch (error) {
    console.error('Error cleaning up saved posts:', error)
  } finally {
    await prisma.$disconnect()
  }
}

cleanupSavedPosts()
