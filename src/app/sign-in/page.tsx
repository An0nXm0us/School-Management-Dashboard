import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { signIn } from "@/lib/actions";
import { parentsData, studentsData, teachersData } from "@/lib/data";
import { Role } from "@/lib/types";

const roleCards: {
  role: Role;
  label: string;
  color: string;
  people: { id: number; name: string }[];
}[] = [
  { role: "admin", label: "Admin", color: "bg-darkerPurple", people: [{ id: 0, name: "Administrator" }] },
  { role: "teacher", label: "Teacher", color: "bg-darkerYellow", people: teachersData },
  { role: "student", label: "Student", color: "bg-skyBlue", people: studentsData },
  { role: "parent", label: "Parent", color: "bg-lightPurple", people: parentsData },
];

const LoginPage = () => {
  const session = getSession();
  if (session) redirect(`/${session.role}`);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F8FA] p-4 gap-8">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        <h1 className="text-xl font-bold">Mosekaphofu Secondary School</h1>
      </div>
      <p className="text-sm text-gray-500 -mt-6">
        This is a mock sign-in for demo purposes — pick a role and a person to explore their dashboard.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
        {roleCards.map((card) => (
          <form
            action={signIn.bind(null, card.role)}
            key={card.role}
            className={`${card.color} rounded-2xl p-5 flex flex-col gap-3`}
          >
            <h2 className="text-lg font-semibold capitalize">{card.label}</h2>
            {card.people.length > 1 ? (
              <select
                name="userId"
                className="rounded-md p-2 text-sm text-gray-700"
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
              className="bg-white rounded-md py-2 text-sm font-medium hover:bg-gray-50"
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
