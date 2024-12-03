import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const makeAdmin = async () => {
  const client = new MongoClient(process.env.DATABASE_URL)

  try {
    await client.connect()
    const db = client.db('estate')

    // Replace 'vinayak' with the username you want to make admin
    const result = await db.collection('User').updateOne({ username: 'vinayak' }, { $set: { isAdmin: true } })

    if (result.matchedCount === 0) {
      console.log('User not found')
    } else if (result.modifiedCount === 0) {
      console.log('User already an admin')
    } else {
      console.log('User successfully made admin')
    }
  } catch (error) {
    console.error('Error making admin:', error)
  } finally {
    await client.close()
  }
}

makeAdmin()
