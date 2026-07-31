import Image from "next/image";
import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import SortButton from "@/components/SortButton";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { getSession } from "@/lib/auth";
import { assignmentsData, classesData, lessonsData, subjectsData, teachersData } from "@/lib/data";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { applySort } from "@/lib/sortData";
import { Assignment } from "@/lib/types";

const columns = [
  { header: "Title", accessor: "title" },
  { header: "Subject", accessor: "subject", className: "hidden md:table-cell" },
  { header: "Class", accessor: "class", className: "hidden md:table-cell" },
  { header: "Teacher", accessor: "teacher", className: "hidden lg:table-cell" },
  { header: "Due Date", accessor: "dueDate", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];

const AssignmentListPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = getSession();
  const role = session?.role;

  const { page, search, sort, teacherId, classId } = searchParams;
  const p = page ? parseInt(page) : 1;

  let data = assignmentsData;
  if (teacherId || classId) {
    const lessonIds = lessonsData
      .filter(
        (l) =>
          (!teacherId || l.teacherId === Number(teacherId)) &&
          (!classId || l.classId === Number(classId))
      )
      .map((l) => l.id);
    data = data.filter((a) => lessonIds.includes(a.lessonId));
  }
  if (search) {
    data = data.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()));
  }
  data = applySort(data, sort, (a) => a.dueDate.getTime());

  const count = data.length;
  const paginated = data.slice((p - 1) * ITEM_PER_PAGE, p * ITEM_PER_PAGE);

  const renderRow = (item: Assignment) => {
    const lesson = lessonsData.find((l) => l.id === item.lessonId);
    const subject = subjectsData.find((s) => s.id === lesson?.subjectId);
    const cls = classesData.find((c) => c.id === lesson?.classId);
    const teacher = teachersData.find((t) => t.id === lesson?.teacherId);
    return (
      <tr
        key={item.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lightPurple"
      >
        <td className="p-4 font-medium">{item.title}</td>
        <td className="hidden md:table-cell">{subject?.name ?? "-"}</td>
        <td className="hidden md:table-cell">{cls?.name ?? "-"}</td>
        <td className="hidden lg:table-cell">{teacher?.name ?? "-"}</td>
        <td className="hidden lg:table-cell">
          {new Intl.DateTimeFormat("en-ZA", { dateStyle: "medium" }).format(item.dueDate)}
        </td>
        <td>
          <div className="flex items-center gap-2">
            {(role === "admin" || role === "teacher") && (
              <>
                <FormContainer table="assignment" type="update" data={item} id={item.id} />
                <FormContainer table="assignment" type="delete" id={item.id} />
              </>
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Assignments</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Blue">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <SortButton />
            {(role === "admin" || role === "teacher") && (
              <FormContainer table="assignment" type="create" />
            )}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={paginated} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default AssignmentListPage;
