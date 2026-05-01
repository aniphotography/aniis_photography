const pool = require('../config/db')

// exports.updateHomeContent = async (req, res) => {
//   const { section, slot } = req.body

//   if (!req.file) {
//     return res.status(400).json({ error: "No image uploaded" })
//   }

//   const newImagePath = req.file.path  // ✅ Cloudinary URL

//   try {
//     const query = `
//       INSERT INTO home_content (section, slot, image_path)
//       VALUES ($1, $2, $3)
//       ON CONFLICT (slot)
//       DO UPDATE SET
//         image_path = $3,
//         section = $1,
//         updated_at = NOW()
//       RETURNING *;
//     `
//     const result = await pool.query(query, [section, slot, newImagePath])
//     res.json(result.rows[0])
//   } catch (err) {
//     console.error("Database Error:", err)
//     res.status(500).json({ error: "Server Error" })
//   }
// }
exports.updateHomeContent = async (req, res) => {
  const { section, slot } = req.body

  if (!req.file) {
    // Changed "image" to "file" to be more accurate
    return res.status(400).json({ error: "No media file uploaded" })
  }

  const newMediaPath = req.file.path // Renamed for clarity

  try {
    const query = `
      INSERT INTO home_content (section, slot, image_path)
      VALUES ($1, $2, $3)
      ON CONFLICT (slot) 
      DO UPDATE SET 
        image_path = $3,
        section = $1,
        updated_at = NOW()
      RETURNING *;
    `
    const result = await pool.query(query, [section, slot, newMediaPath])
    res.json(result.rows[0])
  } catch (err) {
    console.error("Database Error:", err)
    res.status(500).json({ error: "Server Error" })
  }
}
exports.getHomeContent = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM home_content ORDER BY id ASC")
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch home content" })
  }
}