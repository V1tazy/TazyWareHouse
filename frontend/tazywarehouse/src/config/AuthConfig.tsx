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
            const user = await registerUser(credentials.email, credentials.password);
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role
            };
          } else {
            const user = await loginUser(credentials.email, credentials.password);
            if (!user) return null;
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role
            };
          }
        } catch (error) {
          console.error('Authentication error:', error);
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error('Authentication failed');
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  }
};