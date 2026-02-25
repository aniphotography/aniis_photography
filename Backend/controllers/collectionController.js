const pool = require('../config/db')

// Create Collection
exports.createCollection = async (req, res) => {
  try {
    const { title, category } = req.body

    const slug = title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')

    const result = await pool.query(
      `INSERT INTO collections (title, category, slug)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, category, slug]
    )

    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to create collection' })
  }
}

// Get collections by category
exports.getCollectionsByCategory = async (req, res) => {
  try {
    const { category } = req.query

    const result = await pool.query(
      `SELECT * FROM collections
       WHERE category = $1
       ORDER BY created_at DESC`,
      [category]
    )

    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching collections' })
  }
}

// Get single collection with images
exports.getCollectionBySlug = async (req, res) => {
  try {
    const { slug } = req.params

    const collection = await pool.query(
      `SELECT * FROM collections WHERE slug = $1`,
      [slug]
    )

    if (collection.rows.length === 0) {
      return res.status(404).json({ message: 'Collection not found' })
    }

    const images = await pool.query(
      `SELECT * FROM media WHERE collection_id = $1`,
      [collection.rows[0].id]
    )

    res.json({
      collection: collection.rows[0],
      images: images.rows
    })

  } catch (err) {
    res.status(500).json({ message: 'Error fetching collection' })
  }
}