const pool = require('../config/db')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body

    // Save to DB
    const result = await pool.query(
      'INSERT INTO contacts (name,email,message) VALUES ($1,$2,$3) RETURNING *',
      [name, email, message]
    )

    // Send Email Notification
    await transporter.sendMail({
      from: `"Luxe Photography" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: '📩 New Website Enquiry',
      html: `
        <h2>New Enquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    })

    res.status(201).json({
      success: true,
      data: result.rows[0],
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to submit enquiry' })
  }
}