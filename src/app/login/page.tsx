'use client'

import { createAuthorizationUrl, resolveFromIdentity } from '@atcute/oauth-browser-client'
import { useState } from 'react'

export default function LoginPage() {
  const [handle, setHandle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Resolve user's identity from handle
      const { identity, metadata } = await resolveFromIdentity(handle)

      // Create authorization URL
      const authUrl = await createAuthorizationUrl({
        metadata,
        identity,
        scope: process.env.NEXT_PUBLIC_OAUTH_SCOPE!,
      })

      // Wait for browser to persist local storage
      await new Promise(resolve => setTimeout(resolve, 200))

      // Redirect to auth URL
      window.location.assign(authUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main>
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label htmlFor="handle" className="block text-sm font-medium mb-2">
          Enter your handle
        </label>
        <input
          id="handle"
          type="text"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="your.handle.com"
          className="w-full p-2 border rounded"
          disabled={isLoading}
        />
      </div>
      
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      
      <button
        type="submit"
        disabled={isLoading || !handle}
        className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50"
      >
        {isLoading ? 'Loading...' : 'Sign In'}
      </button>
    </form>
    </main>
  )
}