import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import FormContainer from "@/components/FormContainer";
import { getSession } from "@/lib/auth";
import { classesData, lessonsData, subjectsData, teachersData } from "@/lib/data";

const SingleTeacherPage = ({ params }: { params: { id: string } }) => {
  const teacherId = Number(params.id);
  const teacher = teachersData.find((t) => t.id === teacherId);
  if (!teacher) return notFound();

  const session = getSession();
  const role = session?.role;

  const subjects = subjectsData.filter((s) => teacher.subjectIds.includes(s.id));
  const classes = classesData.filter((c) => c.supervisorId === teacher.id);
  const lessons = lessonsData.filter((l) => l.teacherId === teacher.id);

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Info card */}
          <div className="bg-card text-card-foreground border border-border shadow-sm py-6 px-4 rounded-xl flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={teacher.img || "/avatar.png"}
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover border border-border"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">{teacher.name}</h1>
                {role === "admin" && (
                  <FormContainer table="teacher" type="update" data={teacher} id={teacher.id} />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {subjects.map((s) => s.name).join(", ") || "No subjects assigned"}
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/blood.png" alt="" width={14} height={14} className="dark:invert" />
                  <span>{teacher.bloodType}</span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/date.png" alt="" width={14} height={14} className="dark:invert" />
                  <span>{teacher.birthday}</span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/mail.png" alt="" width={14} height={14} className="dark:invert" />
                  <span>{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/phone.png" alt="" width={14} height={14} className="dark:invert" />
                  <span>{teacher.phone}</span>
                </div>
              </div>
            </div>
          </div>
          {/* small cards */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            <div className="bg-card text-card-foreground border border-border shadow-sm p-4 rounded-xl flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image src="/singleAttendance.png" alt="" width={24} height={24} className="w-6 h-6 dark:invert" />
              <div>
                <h1 className="text-xl font-semibold">{subjects.length}</h1>
                <span className="text-sm text-muted-foreground">Subjects</span>
              </div>
            </div>
            <div className="bg-card text-card-foreground border border-border shadow-sm p-4 rounded-xl flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image src="/singleBranch.png" alt="" width={24} height={24} className="w-6 h-6 dark:invert" />
              <div>
                <h1 className="text-xl font-semibold">{classes.length}</h1>
                <span className="text-sm text-muted-foreground">Classes supervised</span>
              </div>
            </div>
            <div className="bg-card text-card-foreground border border-border shadow-sm p-4 rounded-xl flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image src="/singleLesson.png" alt="" width={24} height={24} className="w-6 h-6 dark:invert" />
              <div>
                <h1 className="text-xl font-semibold">{lessons.length}</h1>
                <span className="text-sm text-muted-foreground">Lessons / week</span>
              </div>
            </div>
            <div className="bg-card text-card-foreground border border-border shadow-sm p-4 rounded-xl flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image src="/singleClass.png" alt="" width={24} height={24} className="w-6 h-6 dark:invert" />
              <div>
                <h1 className="text-xl font-semibold">{classes.map((c) => c.name).join(", ") || "-"}</h1>
                <span className="text-sm text-muted-foreground">Homeroom class</span>
              </div>
            </div>
          </div>
        </div>
        {/* schedule */}
        <div className="mt-4 bg-card text-card-foreground border border-border shadow-sm rounded-xl p-4 h-[800px]">
          <h1 className="font-semibold">Teacher&apos;s Schedule</h1>
          <BigCalendarContainer type="teacherId" id={teacher.id} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-card text-card-foreground border border-border shadow-sm p-4 rounded-xl">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs">
            <Link
              className="p-3 rounded-md bg-tagPurple text-tagPurple-foreground hover:opacity-80 transition-opacity"
              href={`/list/classes?supervisorId=${teacher.id}`}
            >
              Teacher&apos;s Classes
            </Link>
            <Link
              className="p-3 rounded-md bg-tagBlue text-tagBlue-foreground hover:opacity-80 transition-opacity"
              href={`/list/lessons?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Lessons
            </Link>
            <Link
              className="p-3 rounded-md bg-tagAmber text-tagAmber-foreground hover:opacity-80 transition-opacity"
              href={`/list/exams?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Exams
            </Link>
            <Link
              className="p-3 rounded-md bg-tagGreen text-tagGreen-foreground hover:opacity-80 transition-opacity"
              href={`/list/assignments?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
