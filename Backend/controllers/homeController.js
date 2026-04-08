// const pool = require('../config/db')

// exports.updateHomeContent = async (req, res) => {
//   const { section, slot } = req.body;
  
//   if (!req.file) {
//     return res.status(400).json({ error: "No image uploaded" });
//   }

//   // The path saved in the DB so the frontend can find it
//   const imagePath = `/uploads/${req.file.filename}`; 

//   try {
//     const query = `
//       INSERT INTO home_content (section, slot, image_path)
//       VALUES ($1, $2, $3)
//       ON CONFLICT (slot) 
//       DO UPDATE SET image_path = $3, updated_at = NOW()
//       RETURNING *;
//     `;
//     const result = await pool.query(query, [section, slot, imagePath]);
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error("Database Error:", err);
//     res.status(500).json({ error: "Server Error" });
//   }
// };

// exports.getHomeContent = async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM home_content");
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch home content" });
//   }
// };
const pool = require('../config/db')
const fs = require('fs')
const path = require('path')

exports.updateHomeContent = async (req, res) => {
  const { section, slot } = req.body;
  
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  const newImagePath = `/uploads/${req.file.filename}`; 

  try {
    // 1. Fetch the existing record to see if there's an old file to delete
    const oldFileQuery = "SELECT image_path FROM home_content WHERE slot = $1";
    const oldFileResult = await pool.query(oldFileQuery, [slot]);

    // 2. Perform the Upsert (Insert or Update)
    const query = `
      INSERT INTO home_content (section, slot, image_path)
      VALUES ($1, $2, $3)
      ON CONFLICT (slot) 
      DO UPDATE SET 
        image_path = $3, 
        section = $1, -- Update section too in case it was moved
        updated_at = NOW()
      RETURNING *;
    `;
    const result = await pool.query(query, [section, slot, newImagePath]);

    // 3. Delete the old file from the disk if it exists
    if (oldFileResult.rows.length > 0) {
      const oldPath = oldFileResult.rows[0].image_path;
      
      // Construct the absolute path to the file on your server
      // Adjust '..' based on your folder structure (e.g., if this is in /controllers/)
      const fullPath = path.join(__dirname, '..', oldPath); 

      // Only delete if the path is different and the file actually exists
      if (oldPath !== newImagePath && fs.existsSync(fullPath)) {
        fs.unlink(fullPath, (err) => {
          if (err) console.error("Cleanup Error (Old file not deleted):", err);
        });
      }
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getHomeContent = async (req, res) => {
  try {
    // Added ORDER BY to keep the Admin Dashboard list stable
    const result = await pool.query("SELECT * FROM home_content ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch home content" });
  }
};