/**
 * Run AFTER npm install to set the admin password.
 *
 * Usage:
 *   node scripts/generate-hash.js YourPassword
 *   node scripts/generate-hash.js              (defaults to Admin@1234)
 *
 * Then copy the printed SQL and run it in your PostgreSQL database.
 */

const bcrypt = require('bcryptjs')

async function main() {
  const password = process.argv[2] || 'Admin@1234'

  if (password.length < 8) {
    console.error('❌ Password must be at least 8 characters')
    process.exit(1)
  }

  console.log('\n⏳ Generating bcrypt hash (this takes a few seconds)...\n')
  const hash = await bcrypt.hash(password, 12)

  console.log('✅ Done! Run ONE of these SQL commands in your PostgreSQL:\n')
  console.log('── Option A: Update existing admin ─────────────────────────────')
  console.log(`UPDATE admin_users`)
  console.log(`SET password_hash = '${hash}'`)
  console.log(`WHERE username = 'admin';\n`)
  console.log('── Option B: Insert fresh (if table is empty) ──────────────────')
  console.log(`INSERT INTO admin_users (username, password_hash)`)
  console.log(`VALUES ('admin', '${hash}')`)
  console.log(`ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash;\n`)
  console.log(`Password used: ${password}`)
  console.log(`Hash:          ${hash}\n`)
}

main().catch(console.error)
