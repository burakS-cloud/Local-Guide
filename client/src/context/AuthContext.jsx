import React, { useContext, useState, useEffect } from "react"
import { auth } from "../Auth/Firebase-Config"
import { createUserWithEmailAndPassword, onAuthStateChanged,signInWithEmailAndPassword,signOut,sendPasswordResetEmail } from 'firebase/auth'

export const AuthContext = React.createContext()

export default function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState('')
  const [loading, setLoading] = useState(true)

  async function signup(email, password) {
    return await createUserWithEmailAndPassword(auth,email, password)
  }

  async function login(email, password) {
    return await signInWithEmailAndPassword(auth,email, password)
  }

  async function logout() {
    return await signOut(auth)
  }

  async function resetPassword(email) {
    return await sendPasswordResetEmail(auth,email)
  }

 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
