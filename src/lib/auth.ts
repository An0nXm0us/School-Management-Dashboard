import { cookies } from "next/headers";
import { parentsData, studentsData, teachersData } from "./data";
import { Role } from "./types";

const ROLES: Role[] = ["admin", "teacher", "student", "parent"];

export interface Session {
  role: Role;
  userId: number;
}

// Mock auth: no real backend yet, just a `role` + `userId` cookie pair set by
// the sign-in page. Swapping this for real Supabase auth later only means
// changing what populates these two values, not who reads them.
export function getSession(): Session | null {
  const store = cookies();
  const role = store.get("role")?.value;
  const userId = store.get("userId")?.value;

  if (!role || !ROLES.includes(role as Role) || userId === undefined) return null;

  return { role: role as Role, userId: Number(userId) };
}

export function getCurrentUser(): (Session & { name: string }) | null {
  const session = getSession();
  if (!session) return null;

  let name = "Administrator";
  if (session.role === "teacher") {
    name = teachersData.find((t) => t.id === session.userId)?.name ?? "Teacher";
  } else if (session.role === "student") {
    name = studentsData.find((s) => s.id === session.userId)?.name ?? "Student";
  } else if (session.role === "parent") {
    name = parentsData.find((p) => p.id === session.userId)?.name ?? "Parent";
  }

  return { ...session, name };
}
