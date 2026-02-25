const pool = require('../config/db')

exports.getMedia = async (req, res) => {
  try {
    const { category } = req.query

    if (category) {
      const result = await pool.query(
        'SELECT * FROM media WHERE category=$1 ORDER BY created_at DESC',
        [category]
      )
      return res.json(result.rows)
    }

    const result = await pool.query(
      'SELECT * FROM media ORDER BY created_at DESC'
    )

    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.createMedia = async (req, res) => {
  try {
    const { title, collection_id } = req.body
    const image_url = `/uploads/${req.file.filename}`

    const result = await pool.query(
      `INSERT INTO media (title, image_url, collection_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, image_url, collection_id]
    )

    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ message: 'Upload failed' })
  }
}

exports.deleteMedia = async (req, res) => {
  try {
    const { id } = req.params

    await pool.query('DELETE FROM media WHERE id=$1', [id])

    res.json({ message: 'Deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' })
  }
}