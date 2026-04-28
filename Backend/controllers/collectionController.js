
const pool = require('../config/db')

/* ================= CREATE COLLECTION ================= */
exports.createCollection = async (req, res) => {
  try {
    // 1. Added youtube_url to the destructured body
    const { title, category, description, date, section, youtube_url } = req.body

    const slug = title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')

    const cover_image = req.files?.cover ? req.files.cover[0].path : null
    const video_url = req.files?.video ? req.files.video[0].path : null
    const cover_video = req.files?.coverVideo ? req.files.coverVideo[0].path : null

    // 2. Added youtube_url to the INSERT query ($10)
    const result = await pool.query(
      `INSERT INTO collections
       (title, category, slug, description, date, section, cover_image, video_url, cover_video, youtube_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [title, category, slug, description, date, section, cover_image, video_url, cover_video, youtube_url]
    )
    res.status(201).json(result.rows[0])

  } catch (err) {
    console.error("CREATE COLLECTION ERROR:", err)
    res.status(500).json({ message: err.message })
  }
}

exports.getCollectionsByCategory = async (req, res) => {
  try {
    const { category, section } = req.query

    // 3. Added youtube_url to the SELECT lists so the frontend can see the link in lists
    if (category) {
      let query = `SELECT id, title, category, section, cover_image, cover_video, video_url, youtube_url, date
                   FROM collections
                   WHERE category=$1`
      const params = [category]

      if (section) {
        query += ` AND section=$2`
        params.push(section)
      }

      query += ` ORDER BY created_at DESC`

      const result = await pool.query(query, params)
      return res.json(result.rows)
    }

    const result = await pool.query(
      `SELECT id, title, category, section, cover_image, cover_video, video_url, youtube_url, date
       FROM collections
       ORDER BY created_at DESC`
    )

    res.json(result.rows)

  } catch (err) {
    console.error("GET COLLECTIONS ERROR:", err)
    res.status(500).json({ message: err.message })
  }
}

/* ================= GET COLLECTION BY ID ================= */
exports.getCollectionById = async (req, res) => {
  try {
    const { id } = req.params

    // 4. SELECT * already includes youtube_url, so no manual change needed here
    const collectionResult = await pool.query(
      `SELECT * FROM collections WHERE id=$1`,
      [id]
    )

    if (collectionResult.rows.length === 0) {
      return res.status(404).json({ message: "Collection not found" })
    }

    const imagesResult = await pool.query(
      `SELECT id,image_url,tag,youtube_url
       FROM media
       WHERE collection_id=$1
       ORDER BY created_at ASC`,
      [id]
    )

    const collection = collectionResult.rows[0]

    res.json({
      ...collection, // Spread the collection data (includes youtube_url)
      collection,    // Keep your existing double-nesting for frontend compatibility
      images: imagesResult.rows
    })

  } catch (err) {
    console.error("GET COLLECTION ERROR:", err)
    res.status(500).json({ message: err.message })
  }
}

/* ================= DELETE COLLECTION ================= */
exports.deleteCollection = async (req, res) => {
  try {
    const { id } = req.params
    await pool.query(`DELETE FROM media WHERE collection_id=$1`, [id])
    await pool.query(`DELETE FROM collections WHERE id=$1`, [id])
    res.json({ message: "Collection deleted" })
  } catch (err) {
    console.error("DELETE COLLECTION ERROR:", err)
    res.status(500).json({ message: "Delete failed" })
  }
}

/* ================= UPDATE FEATURED STATUS ================= */
exports.updateFeaturedStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { is_featured, featured_slot } = req.body

    if (is_featured && featured_slot) {
      await pool.query(
        `UPDATE collections SET is_featured = FALSE, featured_slot = NULL 
         WHERE featured_slot = $1 AND id != $2`,
        [featured_slot, id]
      )
    }

    const result = await pool.query(
      `UPDATE collections 
       SET is_featured = $1, featured_slot = $2 
       WHERE id = $3 
       RETURNING *`,
      [is_featured, is_featured ? featured_slot : null, id]
    )

    res.json(result.rows[0])
  } catch (err) {
    console.error("UPDATE FEATURED ERROR:", err)
    res.status(500).json({ message: err.message })
  }
}

/* ================= GET FEATURED COLLECTIONS ================= */
exports.getFeaturedCollections = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, category, cover_image, cover_video, video_url, youtube_url, featured_slot 
       FROM collections 
       WHERE is_featured = TRUE 
       ORDER BY featured_slot ASC`
    )
    res.json(result.rows)
  } catch (err) {
    console.error("GET FEATURED ERROR:", err)
    res.status(500).json({ message: err.message })
  }
}
  /* ================= UPDATE YOUTUBE URL ================= */
exports.updateYoutubeUrl = async (req, res) => {
  try {
    const { id } = req.params
    const { youtube_url } = req.body
    const result = await pool.query(
      `UPDATE collections SET youtube_url = $1 WHERE id = $2 RETURNING *`,
      [youtube_url, id]
    )
    res.json(result.rows[0])
  } catch (err) {
    console.error("UPDATE YOUTUBE URL ERROR:", err)
    res.status(500).json({ message: err.message })
  }
}
/* ================= UPDATE COLLECTION COVER FIELDS ================= */
exports.updateCollectionCover = async (req, res) => {
  try {
    const { id } = req.params
    const { field } = req.body // 'cover_image', 'video_url', or 'cover_video'

    const allowedFields = ['cover_image', 'video_url', 'cover_video']
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ message: "Invalid field" })
    }

    const result = await pool.query(
      `UPDATE collections SET ${field} = NULL WHERE id = $1 RETURNING *`,
      [id]
    )
    res.json(result.rows[0])
  } catch (err) {
    console.error("UPDATE COVER ERROR:", err)
    res.status(500).json({ message: err.message })
  }
}
