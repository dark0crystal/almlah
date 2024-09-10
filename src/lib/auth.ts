// import { PrismaAdapter } from "@auth/prisma-adapter"
// import GoogleProvider from "next-auth/providers/google"
// import prisma from "./db"
// import type { Adapter } from "next-auth/adapters"

// export const authOptions = {
//   adapter: PrismaAdapter(prisma)as Adapter,
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
// }

// src/lib/auth.ts
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // Other NextAuth configuration options
};
