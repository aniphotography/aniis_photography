import { Suspense } from 'react'
import AdminDashboard from './Dashboard'

export const dynamic = "force-dynamic"

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-gold flex items-center justify-center text-2xl">
        Loading...
      </div>
    }>
      <AdminDashboard />
    </Suspense>
  )
}