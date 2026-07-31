import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { signIn } from "@/lib/actions";
import { parentsData, studentsData, teachersData } from "@/lib/data";
import { Role } from "@/lib/types";
import ThemeToggle from "@/components/ThemeToggle";

const roleCards: {
  role: Role;
  label: string;
  badge: string;
  icon: string;
  people: { id: number; name: string }[];
}[] = [
  {
    role: "admin",
    label: "Admin",
    badge: "bg-tagPurple text-tagPurple-foreground",
    icon: "/profile.png",
    people: [{ id: 0, name: "Administrator" }],
  },
  {
    role: "teacher",
    label: "Teacher",
    badge: "bg-tagBlue text-tagBlue-foreground",
    icon: "/teacher.png",
    people: teachersData,
  },
  {
    role: "student",
    label: "Student",
    badge: "bg-tagAmber text-tagAmber-foreground",
    icon: "/student.png",
    people: studentsData,
  },
  {
    role: "parent",
    label: "Parent",
    badge: "bg-tagGreen text-tagGreen-foreground",
    icon: "/parent.png",
    people: parentsData,
  },
];

const LoginPage = () => {
  const session = getSession();
  if (session) redirect(`/${session.role}`);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4 gap-8 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        <h1 className="text-xl font-bold">Mosekaphofu Secondary School</h1>
      </div>
      <p className="text-sm text-muted-foreground -mt-6 text-center max-w-md">
        This is a mock sign-in for demo purposes — pick a role and a person to explore their dashboard.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
        {roleCards.map((card) => (
          <form
            action={signIn.bind(null, card.role)}
            key={card.role}
            className="bg-card border border-border shadow-sm hover:shadow-md transition-shadow rounded-2xl p-5 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <span className={`w-9 h-9 flex items-center justify-center rounded-full ${card.badge}`}>
                <Image src={card.icon} alt="" width={18} height={18} className="dark:invert" />
              </span>
              <h2 className="text-lg font-semibold">{card.label}</h2>
            </div>
            {card.people.length > 1 ? (
              <select
                name="userId"
                className="rounded-md p-2 text-sm bg-background border border-border text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                defaultValue={card.people[0].id}
              >
                {card.people.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            ) : (
              <input type="hidden" name="userId" value={card.people[0].id} />
            )}
            <button
              type="submit"
              className="bg-accent text-accent-foreground rounded-md py-2 text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Sign in as {card.label}
            </button>
          </form>
        ))}
      </div>
    </div>
  );
};
export default LoginPage;
