'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { FaGoogle } from "react-icons/fa";
import BellLogo from '@/components/BellLogo'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import Link from 'next/link'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()
  const { toast } = useToast()

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) {
      setError(error.message)
      toast({
        title: 'Sign Up Failed',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      setError(null)
      toast({
        title: 'Sign Up Successful',
        description: 'Check your email to complete the sign-up process.',
      })
      router.push('/login?message=Check your email to complete the sign-up process')
    }
  }
  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      toast({
        title: 'Google Login Failed',
        description: error.message,
        variant: 'destructive',
      })
    }
  }
  return (
    <ErrorBoundary>
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full">
        <Link
            href="/"
            className="flex h-20 w-20 items-center justify-center gap-2 text-lg font-semibold text-primary-foreground md:text-base"
          >
            <BellLogo/>
            <span className="sr-only">Bell</span>
          </Link>
        <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <div className="grid gap-2 py-4">
        <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
        <FaGoogle />&nbsp; Sign up with Google 
            </Button>
        </div>
      </div>
      <Toaster />
    </div>
    </ErrorBoundary>
  )
}