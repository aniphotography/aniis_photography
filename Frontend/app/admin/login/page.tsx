'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
export default function AdminLogin() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true)

      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data: { token?: string; message?: string } = await res.json()

      if (res.ok && data.token) {
        localStorage.setItem('adminToken', data.token)
        router.push('/admin/dashboard')
      } else {
        alert(data.message || 'Login failed')
      }

    } catch (error) {
      console.error('Login error:', error)
      alert('Server error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleLogin} className="space-y-4 w-80">
        <h2 className="text-2xl text-gold">Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          className="w-full p-2 bg-gray-800"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-full p-2 bg-gray-800"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold text-black py-2"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}