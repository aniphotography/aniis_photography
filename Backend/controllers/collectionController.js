const pool = require('../config/db')


/* ================= CREATE COLLECTION ================= */

exports.createCollection = async (req, res) => {

  try {

   const { title, category, description, date, section } = req.body

    const slug = title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')

    const cover_image = req.files?.cover
  ? req.files.cover[0].path : null

    
    const video_url = req.files?.video
  ? req.files.video[0].path : null

    const cover_video = req.files?.coverVideo
  ? req.files.coverVideo[0].path : null

const result = await pool.query(
  `INSERT INTO collections
   (title, category, slug, description, date, section, cover_image, video_url, cover_video)
   VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
   RETURNING *`,
  [title, category, slug, description, date, section, cover_image, video_url, cover_video]
)
    res.status(201).json(result.rows[0])

  } catch (err) {

    console.error("CREATE COLLECTION ERROR:", err)
    res.status(500).json({ message: err.message })

  }

}





exports.getCollectionsByCategory = async (req, res) => {

  try {

    const { category, section } = req.query  // <-- get section from query

    if (category) {

      let query = `SELECT id, title, category, section, cover_image, cover_video, date
                   FROM collections
                   WHERE category=$1`
      const params = [category]

      if (section) {   // <-- optional filter by section
        query += ` AND section=$2`
        params.push(section)
      }

      query += ` ORDER BY created_at DESC`

      const result = await pool.query(query, params)
      return res.json(result.rows)
    }

    const result = await pool.query(
      `SELECT id, title, category, section, cover_image, cover_video, date
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

    const collectionResult = await pool.query(
      `SELECT * FROM collections WHERE id=$1`,
      [id]
    )

    if (collectionResult.rows.length === 0) {
      return res.status(404).json({ message: "Collection not found" })
    }

    const imagesResult = await pool.query(
      `SELECT id,image_url,tag
       FROM media
       WHERE collection_id=$1
       ORDER BY created_at ASC`,
      [id]
    )

    const collection = collectionResult.rows[0]

    res.json({
      ...collection,
      collection,
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

    await pool.query(
      `DELETE FROM media WHERE collection_id=$1`,
      [id]
    )

    await pool.query(
      `DELETE FROM collections WHERE id=$1`,
      [id]
    )

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

    // If setting as featured, clear any existing collection in that slot first
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
      `SELECT id, title, category, cover_image, featured_slot 
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

