import { authConfig } from '@/config/AuthConfig';
import NextAuth from 'next-auth'

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST }