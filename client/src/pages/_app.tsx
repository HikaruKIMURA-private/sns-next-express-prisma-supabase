import type { AppProps } from "next/app"
import Navbar from "@/components/Navbar"
import { AuthProvider } from "@/context/auth"
import "@/styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  )
}
