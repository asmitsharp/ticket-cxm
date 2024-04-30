import React, { createContext, useEffect, useState } from "react"
import { authService } from "../services/authService"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem(user)
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const { user, token } = await authService.login(email, password)
      setUser({ ...user, token })
      localStorage.setItem("user", JSON.stringify({ ...user, token }))
      setError(null)
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const register = async (email, password, firstname, lastname, role) => {
    try {
      await authService.register(email, password, firstname, lastname, role)
      setError(null)
    } catch (error) {
      setError(error.message)
      throw err
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  )
}
