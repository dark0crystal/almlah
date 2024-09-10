import createMiddleware from 'next-intl/middleware';
 import { NextRequest, NextResponse } from 'next/server';
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en',  'ar'],
 
  // Used when no locale matches
  defaultLocale: 'ar'
});
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|ar)/:path*']
};






// import { i18nRouter } from 'next-i18n-router';
// import i18nConfig from 'i18nConfig'


// // language middleware 
// export function middleware(request: NextRequest) {
//   console.log('running')
//   return NextResponse.next();
// }
// //checks of what request should run the midddleware
// //EX : don't run the middleware for api route


// export const config = {
//   matcher: '/((?!api|static|.*\\..*|_next).*)'

// };


