import Image from "next/image";
import Pagination from "@/components/Pagination";
import SortButton from "@/components/SortButton";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { getSession } from "@/lib/auth";
import { attendanceData, lessonsData, studentsData, subjectsData } from "@/lib/data";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { applySort } from "@/lib/sortData";

const columns = [
  { header: "Student", accessor: "student" },
  { header: "Lesson", accessor: "lesson", className: "hidden md:table-cell" },
  { header: "Date", accessor: "date", className: "hidden md:table-cell" },
  { header: "Status", accessor: "status" },
];

// Read-only: attendance is captured in bulk per lesson, not edited row-by-row here.
const AttendanceListPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = getSession();
  const role = session?.role;

  const { page, search, sort, studentId } = searchParams;
  const p = page ? parseInt(page) : 1;

  const enriched = attendanceData.map((a) => {
    const student = studentsData.find((s) => s.id === a.studentId);
    const lesson = lessonsData.find((l) => l.id === a.lessonId);
    const subject = subjectsData.find((s) => s.id === lesson?.subjectId);
    return {
      ...a,
      studentName: student?.name ?? "-",
      subjectName: subject?.name ?? lesson?.name ?? "-",
    };
  });

  let data = enriched;
  if (studentId) {
    data = data.filter((a) => a.studentId === Number(studentId));
  }
  if (search) {
    data = data.filter((a) => a.studentName.toLowerCase().includes(search.toLowerCase()));
  }
  if (role === "student") {
    data = data.filter((a) => a.studentId === session?.userId);
  }
  if (role === "parent") {
    const childIds = studentsData.filter((s) => s.parentId === session?.userId).map((s) => s.id);
    data = data.filter((a) => childIds.includes(a.studentId));
  }
  data = applySort(data, sort, (a) => a.date.getTime());

  const count = data.length;
  const paginated = data.slice((p - 1) * ITEM_PER_PAGE, p * ITEM_PER_PAGE);

  const renderRow = (item: (typeof enriched)[number]) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lightPurple"
    >
      <td className="p-4 font-medium">{item.studentName}</td>
      <td className="hidden md:table-cell">{item.subjectName}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-ZA", { dateStyle: "medium" }).format(item.date)}
      </td>
      <td>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            item.present ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {item.present ? "Present" : "Absent"}
        </span>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Attendance</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Blue">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <SortButton />
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={paginated} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default AttendanceListPage;
