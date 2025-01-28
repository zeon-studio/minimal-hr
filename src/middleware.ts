import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const publicUrl = ["/login", "/register", "/verify", "/forgot-password"];

export async function middleware(request: NextRequest) {
  const { user } = (await auth()) || {};
  const isAuth = !!user?.accessToken;

  const url = new URL(request.url);
  const pathname = url.pathname as string;

  // Public routes handling
  if (publicUrl.some((u) => pathname.startsWith(u))) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  if (!isAuth) {
    let from = request.nextUrl.pathname;
    if (request.nextUrl.search) {
      from += request.nextUrl.search;
    }

    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)",
  ],
};
