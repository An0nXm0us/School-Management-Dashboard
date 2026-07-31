import Link from "next/link";
import { redirect } from "next/navigation";
import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { getSession } from "@/lib/auth";
import { classesData, parentsData, studentsData } from "@/lib/data";

const ParentPage = () => {
    const session = getSession();
    if (!session) redirect("/sign-in");

    const parent = parentsData.find((p) => p.id === session.userId);
    if (!parent) redirect("/sign-in");

    const children = studentsData.filter((s) => s.parentId === parent.id);

    return (
        <div className="p-4 flex gap-4 flex-col xl:flex-row">
            <div className="w-full xl:w-2/3 flex flex-col gap-4">
                <h1 className="text-xl font-semibold">Welcome, {parent.name}</h1>
                {children.length === 0 && (
                    <p className="text-sm text-muted-foreground bg-card border border-border shadow-sm p-4 rounded-xl">No students linked yet.</p>
                )}
                {children.map((child) => {
                    const cls = classesData.find((c) => c.id === child.classId);
                    return (
                        <div className="bg-card text-card-foreground border border-border shadow-sm p-4 rounded-xl" key={child.id}>
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="font-semibold">
                                    {child.name} <span className="text-muted-foreground font-normal">({cls?.name ?? "-"})</span>
                                </h2>
                                <Link
                                    href={`/list/students/${child.id}`}
                                    className="text-xs text-accent underline"
                                >
                                    View profile
                                </Link>
                            </div>
                            <div className="h-[500px]">{cls && <BigCalendarContainer type="classId" id={cls.id} />}</div>
                        </div>
                    );
                })}
            </div>
            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                <Announcements />
            </div>
        </div>
    );
};

export default ParentPage;
