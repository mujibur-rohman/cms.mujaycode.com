import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequestWithAuth) {
  const auth = await getToken({ req: request });
  const authenticated = !!auth;
  if (request.nextUrl.pathname === "/auth") {
    if (authenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname === "/") {
    if (!authenticated) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/auth/:path*", "/:path*"],
};
