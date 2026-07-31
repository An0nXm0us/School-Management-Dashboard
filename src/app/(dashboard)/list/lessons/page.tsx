import Image from "next/image";
import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import SortButton from "@/components/SortButton";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { getSession } from "@/lib/auth";
import { classesData, lessonsData, subjectsData, teachersData } from "@/lib/data";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { applySort } from "@/lib/sortData";
import { Lesson } from "@/lib/types";

const columns = [
  { header: "Subject", accessor: "subject" },
  { header: "Class", accessor: "class", className: "hidden md:table-cell" },
  { header: "Teacher", accessor: "teacher", className: "hidden md:table-cell" },
  { header: "Day", accessor: "day", className: "hidden lg:table-cell" },
  { header: "Time", accessor: "time", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];

const LessonListPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = getSession();
  const role = session?.role;

  const { page, search, sort, teacherId, classId } = searchParams;
  const p = page ? parseInt(page) : 1;

  let data = lessonsData;
  if (teacherId) {
    data = data.filter((l) => l.teacherId === Number(teacherId));
  }
  if (classId) {
    data = data.filter((l) => l.classId === Number(classId));
  }
  if (search) {
    data = data.filter((l) => l.name.toLowerCase().includes(search.toLowerCase()));
  }
  data = applySort(data, sort, (l) => l.name.toLowerCase());

  const count = data.length;
  const paginated = data.slice((p - 1) * ITEM_PER_PAGE, p * ITEM_PER_PAGE);

  const renderRow = (item: Lesson) => {
    const subject = subjectsData.find((s) => s.id === item.subjectId);
    const cls = classesData.find((c) => c.id === item.classId);
    const teacher = teachersData.find((t) => t.id === item.teacherId);
    return (
      <tr
        key={item.id}
        className="border-b border-border even:bg-muted/40 text-sm hover:bg-muted transition-colors"
      >
        <td className="p-4 font-medium">{subject?.name ?? item.name}</td>
        <td className="hidden md:table-cell">{cls?.name ?? "-"}</td>
        <td className="hidden md:table-cell">{teacher?.name ?? "-"}</td>
        <td className="hidden lg:table-cell capitalize">{item.day.charAt(0) + item.day.slice(1).toLowerCase()}</td>
        <td className="hidden lg:table-cell">
          {item.startTime} - {item.endTime}
        </td>
        <td>
          <div className="flex items-center gap-2">
            {(role === "admin" || role === "teacher") && (
              <>
                <FormContainer table="lesson" type="update" data={item} id={item.id} />
                <FormContainer table="lesson" type="delete" id={item.id} />
              </>
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-card text-card-foreground border border-border shadow-sm p-4 rounded-xl flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-accent hover:bg-accent/90 transition-colors">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <SortButton />
            {(role === "admin" || role === "teacher") && <FormContainer table="lesson" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={paginated} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default LessonListPage;
