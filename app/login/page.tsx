'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import Image from "next/image"
import BellLogo from '@/components/BellLogo'
import { FaGoogle } from "react-icons/fa";


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      setError(error.message)
      toast({
        title: 'Login Failed',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      setError(null)
      toast({
        title: 'Login Successful',
        description: 'You have been successfully logged in.',
      })
      router.push('/protected')
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
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <Link
              href="/"
              className="flex h-20 w-20 items-center justify-center gap-2 text-lg font-semibold text-primary-foreground md:text-base"
            >
              <BellLogo/>
              <span className="sr-only">Bell</span>
            </Link>
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form onSubmit={handleLogin}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/login/reset"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
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
              Login
            </Button>
          </div>
          </form>
          <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
          <FaGoogle />&nbsp; Login with Google
            </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://business.bell.ca/web/SHOP/Responsive/content/img/img-banner_Pure_Fibre.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] opacity-50 dark:grayscale"
        />
      </div>
    </div>
      <Toaster />
    </ErrorBoundary>
  )
}