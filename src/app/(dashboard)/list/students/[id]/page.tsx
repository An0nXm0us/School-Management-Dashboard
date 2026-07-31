import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import FormContainer from "@/components/FormContainer";
import Performance from "@/components/Performance";
import { getSession } from "@/lib/auth";
import { classesData, gradesData, parentsData, resultsData, studentsData } from "@/lib/data";

const SingleStudentPage = ({ params }: { params: { id: string } }) => {
  const studentId = Number(params.id);
  const student = studentsData.find((s) => s.id === studentId);
  if (!student) return notFound();

  const session = getSession();
  const role = session?.role;

  const grade = gradesData.find((g) => g.id === student.gradeId);
  const cls = classesData.find((c) => c.id === student.classId);
  const parent = parentsData.find((p) => p.id === student.parentId);
  const results = resultsData.filter((r) => r.studentId === student.id);
  const average = results.length
    ? results.reduce((sum, r) => sum + r.score, 0) / results.length
    : 0;

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Info card */}
          <div className="bg-darkerPurple py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={student.img || "/avatar.png"}
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">{student.name}</h1>
                {role === "admin" && (
                  <FormContainer table="student" type="update" data={student} id={student.id} />
                )}
              </div>
              <p className="text-sm text-gray-500">
                {cls?.name ?? "-"} · Parent: {parent?.name ?? "-"}
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>{student.bloodType}</span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>{student.birthday}</span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>{student.phone}</span>
                </div>
              </div>
            </div>
          </div>
          {/* small cards */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image src="/singleClass.png" alt="" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold">{grade ? `Grade ${grade.level}` : "-"}</h1>
                <span className="text-sm text-gray-400">Grade</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image src="/singleBranch.png" alt="" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold">{cls?.name ?? "-"}</h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image src="/singleLesson.png" alt="" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold">{results.length}</h1>
                <span className="text-sm text-gray-400">Results recorded</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image src="/singleAttendance.png" alt="" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold">{Math.round(average)}%</h1>
                <span className="text-sm text-gray-400">Average score</span>
              </div>
            </div>
          </div>
        </div>
        {/* schedule */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1 className="font-semibold">Student&apos;s Schedule</h1>
          {cls && <BigCalendarContainer type="classId" id={cls.id} />}
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-lightPurple" href={`/list/lessons?classId=${student.classId}`}>
              Student&apos;s Lessons
            </Link>
            <Link className="p-3 rounded-md bg-skyBlue" href={`/list/results?studentId=${student.id}`}>
              Student&apos;s Results
            </Link>
            <Link className="p-3 rounded-md bg-lightYellow" href={`/list/exams?classId=${student.classId}`}>
              Student&apos;s Exams
            </Link>
            <Link className="p-3 rounded-md bg-lightPurple" href={`/list/attendance?studentId=${student.id}`}>
              Student&apos;s Attendance
            </Link>
          </div>
        </div>
        <Performance average={average} />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleStudentPage;
