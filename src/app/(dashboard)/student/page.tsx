import { redirect } from "next/navigation";
import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import Performance from "@/components/Performance";
import { getSession } from "@/lib/auth";
import { classesData, resultsData, studentsData } from "@/lib/data";

const StudentPage = () => {
    const session = getSession();
    if (!session) redirect("/sign-in");

    const student = studentsData.find((s) => s.id === session.userId);
    if (!student) redirect("/sign-in");

    const cls = classesData.find((c) => c.id === student.classId);
    const results = resultsData.filter((r) => r.studentId === student.id);
    const average = results.length
        ? results.reduce((sum, r) => sum + r.score, 0) / results.length
        : 0;

    return (
        <div className="p-4 flex gap-4 flex-col xl:flex-row">
            <div className="w-full xl:w-2/3">
                <div className="h-full bg-white p-4 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-xl font-semibold">Welcome, {student.name}</h1>
                        <span className="text-sm text-gray-400">{cls?.name ?? "-"}</span>
                    </div>
                    <h2 className="font-semibold text-sm text-gray-500 mb-2">Your Schedule</h2>
                    <div className="h-[700px]">
                        {cls && <BigCalendarContainer type="classId" id={cls.id} />}
                    </div>
                </div>
            </div>
            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                <Performance average={average} />
                <Announcements />
            </div>
        </div>
    );
};

export default StudentPage;
