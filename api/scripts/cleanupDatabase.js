import prisma from '../lib/prisma.js'

const cleanupDatabase = async () => {
  try {
    // First, delete all SavedPost entries
    await prisma.savedPost.deleteMany({})
    console.log('Cleared SavedPost collection')

    // Then update the schema to include isAdmin field
    await prisma.$runCommandRaw({
      collMod: 'User',
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['email', 'username', 'password'],
          properties: {
            isAdmin: {
              bsonType: 'bool',
              default: false,
            },
          },
        },
      },
    })
    console.log('Updated User schema')

    console.log('Database cleanup completed successfully')
  } catch (error) {
    console.error('Error during cleanup:', error)
  } finally {
    await prisma.$disconnect()
  }
}

cleanupDatabase()
