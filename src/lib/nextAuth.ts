// import { prisma } from './prisma'
// import { session } from './session'
// import { NextAuthOptions } from 'next-auth'
// import NextAuth from 'next-auth/next'
// import GoogleProvider from 'next-auth/providers/google'
// import { type AuthOptions } from 'next-auth'



// export const authOptions:AuthOptions = {
//     session: {
//         strategy: 'jwt',
//       },
      
//       providers: [
//         GoogleProvider({
            
//           clientId: process.env.GOOGLE_CLIENT_ID as string,
//           clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
//         })
//       ],
//       callbacks: {
//         async signIn({ account, profile }) {
//           if (!profile?.email) {
//             throw new Error('No profile')
//           }
    
//           await prisma.user.upsert({
//             where: {
//               email: profile.email,
//             },
//             create: {
//               email: profile.email,
//               name: profile.name,
//             },
//             update: {
//               name: profile.name,
//               image:profile.image
//             },
//           })
//           return true
//         },
//         session,
//         async jwt({ token, user, account, profile }) {
//           if(account){
//             token.id = account.userId
            
//           }
       
//           if (profile) {
//             const user = await prisma.user.findUnique({
//               where: {
//                 email: profile.email,
//               },
//             })
//             if (!user) {
//               throw new Error('No user found')
//             }
//             token.id = user.id
//           }
//           return token
//         },  
//       },
// }