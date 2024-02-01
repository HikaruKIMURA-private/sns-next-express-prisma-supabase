import apiClient from "@/lib/apiClient"
import React, { ReactNode, useContext, useEffect, useState } from "react"

interface AuthContextType {
  user: null | {
    id: number
    email: string
    username: string
  }
  login: (token: string) => void
  logout: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<null | { id: number; email: string; username: string }>(null)
  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if (token) {
      apiClient
        .get("/users/find")
        .then((res) => {
          setUser(res.data.user)
        })
        .catch((err) => {
          console.log(err)
        })
      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`
    }
  }, [])

  const login = async (token: string) => {
    try {
      apiClient.get("/users/find").then((res) => {
        setUser(res.data.user)
      })
    } catch (err) {
      console.log(err)
    }
    localStorage.setItem("auth_token", token)
  }
  const logout = () => {
    localStorage.removeItem("auth_token")
  }

  const value = {
    user,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
