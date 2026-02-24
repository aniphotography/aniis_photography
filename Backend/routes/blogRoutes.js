const express = require('express')
const router = express.Router()

const auth = require('../middleware/authMiddleware')
const {
  getBlogs,
  createBlog
} = require('../controllers/blogController')

// Public
router.get('/', getBlogs)

// Admin
router.post('/', auth, createBlog)

module.exports = router