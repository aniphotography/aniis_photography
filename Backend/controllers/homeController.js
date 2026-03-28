const pool = require('../config/db')

exports.updateHomeContent = async (req, res) => {
  const { section, slot } = req.body;
  
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  // The path saved in the DB so the frontend can find it
  const imagePath = `/uploads/${req.file.filename}`; 

  try {
    const query = `
      INSERT INTO home_content (section, slot, image_path)
      VALUES ($1, $2, $3)
      ON CONFLICT (slot) 
      DO UPDATE SET image_path = $3, updated_at = NOW()
      RETURNING *;
    `;
    const result = await pool.query(query, [section, slot, imagePath]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getHomeContent = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM home_content");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch home content" });
  }
};