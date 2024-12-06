import prisma from '../lib/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const adminLogin = async (req, res) => {
  const { username, password } = req.body

  try {
    const admin = await prisma.user.findUnique({
      where: { username },
    })

    if (!admin || !admin.isAdmin) return res.status(403).json({ message: 'Not authorized!' })

    const isPasswordValid = await bcrypt.compare(password, admin.password)
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials!' })

    const token = jwt.sign(
      {
        id: admin.id,
        isAdmin: true,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' }
    )

    const { password: _, ...adminInfo } = admin

    res
      .cookie('adminToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : 'localhost',
      })
      .status(200)
      .json(adminInfo)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Failed to login!' })
  }
}

export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    })
    res.status(200).json(posts)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Failed to get posts!' })
  }
}

export const deletePost = async (req, res) => {
  const { id } = req.params

  try {
    // First delete the PostDetail if it exists
    await prisma.postDetail.deleteMany({
      where: { postId: id },
    })

    // Then delete any SavedPost entries
    await prisma.savedPost.deleteMany({
      where: { postId: id },
    })

    // Finally delete the Post
    await prisma.post.delete({
      where: { id },
    })

    res.status(200).json({ message: 'Post deleted successfully' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Failed to delete post!' })
  }
}

export const verifyAdmin = async (req, res) => {
  res.status(200).json({ message: 'Verified' })
}

export const registerFirstAdmin = async (req, res) => {
  const { username, email, password, adminSecret } = req.body

  // Verify admin secret key
  if (adminSecret !== process.env.ADMIN_SECRET_KEY) {
    return res.status(403).json({ message: 'Invalid admin secret key!' })
  }

  try {
    // Check if any admin exists
    const existingAdmin = await prisma.user.findFirst({
      where: {
        isAdmin: true,
      },
    })

    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists!' })
    }

    // Check if username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    })

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists!' })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create admin user
    const newAdmin = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        isAdmin: true,
      },
    })

    const { password: _, ...adminInfo } = newAdmin
    res.status(201).json(adminInfo)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Failed to create admin!' })
  }
}
