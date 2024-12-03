import jwt from 'jsonwebtoken'

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.adminToken

  if (!token) return res.status(401).json({ message: 'Not Authenticated!' })

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) return res.status(403).json({ message: 'Token is not Valid!' })
    if (!payload.isAdmin) return res.status(403).json({ message: 'Not authorized!' })

    req.adminId = payload.id
    next()
  })
}
