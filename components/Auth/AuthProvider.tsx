"use client"

import { createContext, useContext } from "react"
import { useAuthBootstrap } from "@/lib/useAuthBootstrap"
import AuthLoading from "./AuthLoading"

const AuthReadyContext = createContext(false)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { ready } = useAuthBootstrap()

  if (!ready) {
    return <AuthLoading />
  }

  return (
    <AuthReadyContext.Provider value={true}>
      {children}
    </AuthReadyContext.Provider>
  )
}

export function useAuthReady() {
  return useContext(AuthReadyContext)
}
