import { NextRequest, NextResponse } from "next/server";

const ROLES = ["admin", "teacher", "student", "parent"] as const;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const role = req.cookies.get("role")?.value;

  const matchedRole = ROLES.find(
    (r) => pathname === `/${r}` || pathname.startsWith(`/${r}/`)
  );
  const isProtected = Boolean(matchedRole) || pathname.startsWith("/list");

  if (!role && isProtected) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (role && pathname === "/sign-in") {
    return NextResponse.redirect(new URL(`/${role}`, req.url));
  }

  if (role && matchedRole && matchedRole !== role) {
    return NextResponse.redirect(new URL(`/${role}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/teacher/:path*",
    "/student/:path*",
    "/parent/:path*",
    "/list/:path*",
    "/sign-in",
  ],
};
