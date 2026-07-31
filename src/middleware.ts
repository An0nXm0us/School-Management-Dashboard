import { NextRequest, NextResponse } from "next/server";

const ROLES = ["admin", "teacher", "student", "parent"] as const;
type Role = (typeof ROLES)[number];

// Mirrors the `visible` arrays in components/Menu.tsx — the menu only hides
// these links from student/parent, it doesn't stop them navigating there
// directly, so the same rule has to be enforced here too.
const RESTRICTED_LIST_SEGMENTS: Record<string, readonly Role[]> = {
  teachers: ["admin", "teacher"],
  students: ["admin", "teacher"],
  parents: ["admin", "teacher"],
  subjects: ["admin"],
  classes: ["admin", "teacher"],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const rawRole = req.cookies.get("role")?.value;
  const role = ROLES.find((r) => r === rawRole);

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

  if (role && pathname.startsWith("/list/")) {
    const segment = pathname.split("/")[2];
    const allowed = RESTRICTED_LIST_SEGMENTS[segment];
    if (allowed && !allowed.includes(role)) {
      return NextResponse.redirect(new URL(`/${role}`, req.url));
    }
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
