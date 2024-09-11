// // import { PrismaAdapter } from '@next-auth/prisma-adapter';
// // import GoogleProvider from "next-auth/providers/google"
// // import prisma from "./db"
// // // import type { Adapter } from "next-auth/adapters"
// // import { type AuthOptions } from 'next-auth';

// // export const authOptions : AuthOptions  = {
// //   adapter: PrismaAdapter(prisma),
// //   // as Adapter
// //   providers: [
// //     GoogleProvider({
// //       clientId: process.env.GOOGLE_CLIENT_ID as string,
// //       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
// //     }),
// //   ],
// // }

// // import { PrismaAdapter } from '@next-auth/prisma-adapter';
// // import GoogleProvider from 'next-auth/providers/google';
// // import {prisma} from './prisma';
// // import { NextAuthOptions } from 'next-auth';

// // export const authOptions: NextAuthOptions = {
// //   adapter: PrismaAdapter(prisma),
// //   providers: [
// //     GoogleProvider({
// //       clientId: process.env.GOOGLE_CLIENT_ID!,
// //       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
// //     }),
// //   ],
// // }

// import { prisma } from "./prisma";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import GoogleProvider from "next-auth/providers/google";
// import type { NextAuthOptions } from "next-auth";

// export const authOptions: NextAuthOptions = {
//   // This is a temporary fix for prisma client.
//   // @see https://github.com/prisma/prisma/issues/16117
//   adapter: PrismaAdapter(prisma as any),
//   pages: {
//     signIn: "/login", // Custom sign-in page if you have one
//   },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
//   callbacks: {
//     session: ({ session, token }) => {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: token.id,
//         },
//       };
//     },
//     jwt: ({ token, user }) => {
//       if (user) {
//         const u = user as unknown as any;
//         return {
//           ...token,
//           id: u.id,
//         };
//       }
//       return token;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET, // Ensure you have this set
// };
import { PrismaAdapter } from "@auth/prisma-adapter"
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
