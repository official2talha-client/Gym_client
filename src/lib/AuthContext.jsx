import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'fit-elegant-mock-session'

// ---------------------------------------------------------------------------
// Mock session only. There is no backend in this build -- this context
// simulates what a real auth provider would expose (user, role, sign in/out)
// so every route guard and role-scoped screen is already wired correctly
// and ready to point at real backend-issued tokens later.
// ---------------------------------------------------------------------------
export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    else localStorage.removeItem(STORAGE_KEY)
  }, [session])

  const signIn = ({ name = 'Demo User', email, role = 'member' }) => {
    setSession({ name, email, role })
  }
  const signOut = () => setSession(null)

  return (
    <AuthContext.Provider value={{ session, signIn, signOut, isAuthenticated: !!session }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
