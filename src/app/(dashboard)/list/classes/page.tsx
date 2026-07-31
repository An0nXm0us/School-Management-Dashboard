import Image from "next/image";
import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import SortButton from "@/components/SortButton";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { getSession } from "@/lib/auth";
import { classesData, gradesData, teachersData } from "@/lib/data";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { applySort } from "@/lib/sortData";
import { Class } from "@/lib/types";

const columns = [
  { header: "Class Name", accessor: "name" },
  { header: "Capacity", accessor: "capacity", className: "hidden md:table-cell" },
  { header: "Grade", accessor: "grade", className: "hidden md:table-cell" },
  { header: "Supervisor", accessor: "supervisor", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];

const ClassListPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = getSession();
  const role = session?.role;

  const { page, search, sort, supervisorId } = searchParams;
  const p = page ? parseInt(page) : 1;

  let data = classesData;
  if (supervisorId) {
    data = data.filter((c) => c.supervisorId === Number(supervisorId));
  }
  if (search) {
    data = data.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  }
  data = applySort(data, sort, (c) => c.name.toLowerCase());

  const count = data.length;
  const paginated = data.slice((p - 1) * ITEM_PER_PAGE, p * ITEM_PER_PAGE);

  const renderRow = (item: Class) => {
    const grade = gradesData.find((g) => g.id === item.gradeId);
    const supervisor = teachersData.find((t) => t.id === item.supervisorId);
    return (
      <tr
        key={item.id}
        className="border-b border-border even:bg-muted/40 text-sm hover:bg-muted transition-colors"
      >
        <td className="p-4 font-medium">{item.name}</td>
        <td className="hidden md:table-cell">{item.capacity}</td>
        <td className="hidden md:table-cell">{grade ? `Grade ${grade.level}` : "-"}</td>
        <td className="hidden lg:table-cell">{supervisor?.name ?? "-"}</td>
        <td>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <FormContainer table="class" type="update" data={item} id={item.id} />
                <FormContainer table="class" type="delete" id={item.id} />
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
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-accent hover:bg-accent/90 transition-colors">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <SortButton />
            {role === "admin" && <FormContainer table="class" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={paginated} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default ClassListPage;
