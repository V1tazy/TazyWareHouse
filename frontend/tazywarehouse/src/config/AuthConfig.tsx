// @/config/AuthConfig.ts
import type { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { registerUser, loginUser } from '@/services/auth.service'

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        isRegister: { label: 'IsRegister', type: 'hidden' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null

        try {
          if (credentials.isRegister === 'true') {
            return await registerUser(credentials.email, credentials.password)
          } else {
            return await loginUser(credentials.email, credentials.password)
          }
        } catch (error) {
          console.error('Authentication error:', error)
          if (error instanceof Error) {
            throw new Error(error.message)
          }
          throw new Error('Authentication failed')
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
}