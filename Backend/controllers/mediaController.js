const pool = require('../config/db')

/* ================= GET MEDIA ================= */

exports.getMedia = async (req, res) => {
  try {

    const { collection_id, tag } = req.query

    if (collection_id) {

      const result = await pool.query(
        `SELECT * FROM media
         WHERE collection_id = $1
         ORDER BY created_at DESC`,
        [collection_id]
      )

      return res.json(result.rows)
    }

    if (tag) {

      const result = await pool.query(
        `SELECT * FROM media
         WHERE tag = $1
         ORDER BY created_at DESC`,
        [tag]
      )

      return res.json(result.rows)
    }

    const result = await pool.query(
      `SELECT * FROM media
       ORDER BY created_at DESC`
    )

    res.json(result.rows)

  } catch (err) {

    console.error(err)
    res.status(500).json({ message: "Server error" })

  }
}


/* ================= SINGLE IMAGE UPLOAD ================= */

exports.createMedia = async (req, res) => {
  try {

    const { title, collection_id, tag } = req.body

    const image_url = `/uploads/${req.file.filename}`

    const result = await pool.query(
      `INSERT INTO media (title, image_url, collection_id, tag)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [title, image_url, collection_id, tag]
    )

    res.json(result.rows[0])

  } catch (err) {

    console.error(err)
    res.status(500).json({ message: 'Upload failed' })

  }
}


/* ================= MULTIPLE IMAGE UPLOAD ================= */
exports.uploadMultiple = async (req, res) => {

  try {

    console.log("BODY:", req.body)
    console.log("FILES:", req.files)

    const collection_id = req.body?.collection_id
    const tag = req.body?.tag
    const content = req.body?.content

    // ❌ prevent crash
    if (!collection_id) {
      return res.status(400).json({ message: "collection_id missing" })
    }

    // ✅ 1. INSERT TEXT
    if (content && content.trim() !== '') {
      await pool.query(
        `INSERT INTO media (collection_id, content, tag)
         VALUES ($1,$2,$3)`,
        [collection_id, content, tag || 'text']
      )
    }

    // ✅ 2. INSERT FILES (SAFE CHECK)
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      for (let file of req.files) {
        await pool.query(
          `INSERT INTO media (collection_id, image_url, tag)
           VALUES ($1,$2,$3)`,
          [
            collection_id,
            `/uploads/${file.filename}`,
            tag
          ]
        )
      }
    }

    res.json({ message: "Uploaded successfully" })

  } catch (err) {

    console.error("UPLOAD ERROR:", err)
    res.status(500).json({ message: "Upload failed" })

  }

}
/* ================= DELETE IMAGE ================= */

exports.deleteMedia = async (req, res) => {
  try {

    const { id } = req.params

    await pool.query(
      `DELETE FROM media WHERE id = $1`,
      [id]
    )

    res.json({ message: "Deleted successfully" })

  } catch (err) {

    console.error(err)
    res.status(500).json({ message: "Delete failed" })

  }
}