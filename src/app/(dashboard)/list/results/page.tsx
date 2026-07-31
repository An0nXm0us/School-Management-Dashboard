import Pagination from "@/components/Pagination";
import SortButton from "@/components/SortButton";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { getSession } from "@/lib/auth";
import {
  assignmentsData,
  examsData,
  lessonsData,
  resultsData,
  studentsData,
  subjectsData,
} from "@/lib/data";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { applySort } from "@/lib/sortData";
import { Result } from "@/lib/types";

const columns = [
  { header: "Student", accessor: "student" },
  { header: "Subject", accessor: "subject", className: "hidden md:table-cell" },
  { header: "Type", accessor: "type", className: "hidden md:table-cell" },
  { header: "Score", accessor: "score" },
];

// Read-only: results come from exam/assignment grading, not free-form entry here.
const ResultListPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = getSession();
  const role = session?.role;

  const { page, search, sort, studentId } = searchParams;
  const p = page ? parseInt(page) : 1;

  const enriched = resultsData.map((r) => {
    const student = studentsData.find((s) => s.id === r.studentId);
    const exam = r.examId ? examsData.find((e) => e.id === r.examId) : null;
    const assignment = r.assignmentId ? assignmentsData.find((a) => a.id === r.assignmentId) : null;
    const lesson = lessonsData.find((l) => l.id === (exam?.lessonId ?? assignment?.lessonId));
    const subject = subjectsData.find((s) => s.id === lesson?.subjectId);
    return {
      ...r,
      studentName: student?.name ?? "-",
      subjectName: subject?.name ?? "-",
      type: exam ? "Exam" : "Assignment",
      title: exam?.title ?? assignment?.title ?? "-",
    };
  });

  let data = enriched;
  if (studentId) {
    data = data.filter((r) => r.studentId === Number(studentId));
  }
  if (search) {
    const q = search.toLowerCase();
    data = data.filter(
      (r) => r.studentName.toLowerCase().includes(q) || r.subjectName.toLowerCase().includes(q)
    );
  }
  if (role === "student") {
    data = data.filter((r) => r.studentId === session?.userId);
  }
  if (role === "parent") {
    const childIds = studentsData.filter((s) => s.parentId === session?.userId).map((s) => s.id);
    data = data.filter((r) => childIds.includes(r.studentId));
  }
  data = applySort(data, sort, (r) => r.studentName.toLowerCase());

  const count = data.length;
  const paginated = data.slice((p - 1) * ITEM_PER_PAGE, p * ITEM_PER_PAGE);

  const renderRow = (item: (typeof enriched)[number]) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lightPurple"
    >
      <td className="p-4 font-medium">{item.studentName}</td>
      <td className="hidden md:table-cell">
        {item.subjectName} <span className="text-gray-400">({item.title})</span>
      </td>
      <td className="hidden md:table-cell">{item.type}</td>
      <td>{item.score}</td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
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

export default ResultListPage;
