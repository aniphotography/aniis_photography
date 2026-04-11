const pool = require('../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body

    const result = await pool.query(
      'SELECT * FROM admin_users WHERE username = $1',
      [username]
    )

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Admin not found' })
    }

    const admin = result.rows[0]

    const isMatch = await bcrypt.compare(password, admin.password_hash)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({ token })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
  console.log("LOGIN REQUEST:", username);
}
