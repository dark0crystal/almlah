// import { prisma } from 'src/lib/prisma'
// import { session } from 'src/lib/session'
// import GoogleProvider from 'next-auth/providers/google'

// import { NextAuthOptions } from 'next-auth'



import {authOptions}from "src/lib/auth"
import NextAuth from "next-auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }



