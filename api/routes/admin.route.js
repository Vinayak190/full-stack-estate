import express from 'express'
import { adminLogin, getAllPosts, deletePost, verifyAdmin, registerFirstAdmin } from '../controllers/admin.controller.js'
import { verifyAdmin as verifyAdminMiddleware } from '../middleware/verifyAdmin.js'

const router = express.Router()

router.post('/register-first-admin', registerFirstAdmin)
router.post('/login', adminLogin)
router.get('/verify', verifyAdminMiddleware, verifyAdmin)
router.get('/posts', verifyAdminMiddleware, getAllPosts)
router.delete('/posts/:id', verifyAdminMiddleware, deletePost)

export default router
