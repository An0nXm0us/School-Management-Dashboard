import { redirect } from "next/navigation";
import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { getSession } from "@/lib/auth";
import { classesData, subjectsData, teachersData } from "@/lib/data";

const TeacherPage = () => {
    const session = getSession();
    if (!session) redirect("/sign-in");

    const teacher = teachersData.find((t) => t.id === session.userId);
    if (!teacher) redirect("/sign-in");

    const subjects = subjectsData.filter((s) => teacher.subjectIds.includes(s.id));
    const classes = classesData.filter((c) => c.supervisorId === teacher.id);

    return (
        <div className="p-4 flex gap-4 flex-col xl:flex-row">
            <div className="w-full xl:w-2/3">
                <div className="h-full bg-card text-card-foreground border border-border shadow-sm p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-xl font-semibold">Welcome, {teacher.name}</h1>
                        <span className="text-sm text-muted-foreground">
                            {subjects.map((s) => s.name).join(", ") || "No subjects assigned"}
                        </span>
                    </div>
                    <h2 className="font-semibold text-sm text-muted-foreground mb-2">Your Schedule</h2>
                    <div className="h-[700px]">
                        <BigCalendarContainer type="teacherId" id={teacher.id} />
                    </div>
                </div>
            </div>
            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                <div className="bg-card text-card-foreground border border-border shadow-sm p-4 rounded-xl">
                    <h1 className="text-xl font-semibold mb-2">Classes you supervise</h1>
                    {classes.length === 0 && <p className="text-sm text-muted-foreground">None yet.</p>}
                    <ul className="flex flex-col gap-2 text-sm">
                        {classes.map((c) => (
                            <li key={c.id} className="p-2 rounded-md bg-muted">
                                {c.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <Announcements />
            </div>
        </div>
    );
};

export default TeacherPage;
