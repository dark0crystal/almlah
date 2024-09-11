import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from "next-auth/providers/google"
import prisma from "./db"
import type { Adapter } from "next-auth/adapters"

export const authOptions = {
  adapter: PrismaAdapter(prisma)as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
}

// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import GoogleProvider from 'next-auth/providers/google';
// import {prisma} from './prisma';
// import { NextAuthOptions } from 'next-auth';

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
// }
