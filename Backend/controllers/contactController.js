const pool = require('../config/db')
const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)

exports.createContact = async (req, res) => {
  try {
    const { name, email, message, phone, eventType } = req.body

    const result = await pool.query(
      `INSERT INTO contacts (name, email, message, phone, event_type) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, message, phone, eventType]
    )

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.EMAIL_USER,
      subject: '📩 New Booking Enquiry',
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Event Type:</strong> ${eventType}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    })

    res.status(201).json({ success: true, data: result.rows[0] })

  } catch (err) {
    console.error("ERROR:", err)
    res.status(500).json({ message: 'Failed to submit enquiry' })
  }
}