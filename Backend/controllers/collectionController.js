const pool = require('../config/db')


/* ================= CREATE COLLECTION ================= */

exports.createCollection = async (req, res) => {

  try {

    const { title, category, description, date } = req.body

    const slug = title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')

    const cover_image = req.files?.cover
      ? `/uploads/${req.files.cover[0].filename}`
      : null

    const video_url = req.files?.video
      ? `/uploads/${req.files.video[0].filename}`
      : null

    const cover_video = req.files?.coverVideo
      ? `/uploads/${req.files.coverVideo[0].filename}`
      : null


    const result = await pool.query(
      `INSERT INTO collections
      (title, category, slug, description, date, cover_image, video_url, cover_video)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [
        title,
        category,
        slug,
        description,
        date,
        cover_image,
        video_url,
        cover_video
      ]
    )

    res.status(201).json(result.rows[0])

  } catch (err) {

    console.error("CREATE COLLECTION ERROR:", err)
    res.status(500).json({ message: err.message })

  }

}



/* ================= GET COLLECTIONS ================= */

exports.getCollectionsByCategory = async (req, res) => {

  try {

    const { category } = req.query

    if (category) {

      const result = await pool.query(
        `SELECT id,title,cover_image,cover_video,date
         FROM collections
         WHERE category=$1
         ORDER BY created_at DESC`,
        [category]
      )

      return res.json(result.rows)
    }

    const result = await pool.query(
      `SELECT id,title,cover_image,cover_video,date
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

    res.json({
      collection: collectionResult.rows[0],
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