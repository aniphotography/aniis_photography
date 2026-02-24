const pool = require('../config/db')

exports.getBlogs = async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM blogs ORDER BY created_at DESC'
  )
  res.json(result.rows)
}

exports.createBlog = async (req, res) => {
  const { title, content } = req.body

  const result = await pool.query(
    'INSERT INTO blogs (title, content) VALUES ($1,$2) RETURNING *',
    [title, content]
  )

  res.json(result.rows[0])
}