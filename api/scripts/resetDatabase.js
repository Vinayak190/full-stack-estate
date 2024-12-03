import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const resetDatabase = async () => {
  const client = new MongoClient(process.env.DATABASE_URL)

  try {
    await client.connect()
    const db = client.db('estate')

    // Drop the SavedPost collection entirely
    await db
      .collection('SavedPost')
      .drop()
      .catch((err) => {
        if (err.code !== 26) {
          // 26 is the error code for "namespace not found"
          throw err
        }
      })

    // Add isAdmin field to all users if it doesn't exist
    await db.collection('User').updateMany({ isAdmin: { $exists: false } }, { $set: { isAdmin: false } })

    console.log('Database reset completed successfully')
  } catch (error) {
    console.error('Error during reset:', error)
  } finally {
    await client.close()
  }
}

resetDatabase()
