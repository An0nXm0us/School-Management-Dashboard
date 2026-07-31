import Image from "next/image";
import Link from "next/link";
import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import SortButton from "@/components/SortButton";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { getSession } from "@/lib/auth";
import { classesData, subjectsData, teachersData } from "@/lib/data";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { applySort } from "@/lib/sortData";
import { Teacher } from "@/lib/types";

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Subjects", accessor: "subjects", className: "hidden md:table-cell" },
  { header: "Classes", accessor: "classes", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];

const TeacherListPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = getSession();
  const role = session?.role;

  const { page, search, sort } = searchParams;
  const p = page ? parseInt(page) : 1;

  let data = teachersData;
  if (search) {
    const q = search.toLowerCase();
    data = data.filter((t) => t.name.toLowerCase().includes(q) || t.email.toLowerCase().includes(q));
  }
  data = applySort(data, sort, (t) => t.name.toLowerCase());

  const count = data.length;
  const paginated = data.slice((p - 1) * ITEM_PER_PAGE, p * ITEM_PER_PAGE);

  const renderRow = (item: Teacher) => {
    const subjects = subjectsData.filter((s) => item.subjectIds.includes(s.id));
    const classes = classesData.filter((c) => c.supervisorId === item.id);
    return (
      <tr
        key={item.id}
        className="border-b border-border even:bg-muted/40 text-sm hover:bg-muted transition-colors"
      >
        <td className="flex items-center gap-4 p-4">
          <Image
            src={item.img || "/avatar.png"}
            alt=""
            width={40}
            height={40}
            className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-xs text-muted-foreground">{item.email}</p>
          </div>
        </td>
        <td className="hidden md:table-cell">{subjects.map((s) => s.name).join(", ") || "-"}</td>
        <td className="hidden md:table-cell">{classes.map((c) => c.name).join(", ") || "-"}</td>
        <td className="hidden lg:table-cell">{item.phone}</td>
        <td className="hidden lg:table-cell">{item.address}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link href={`/list/teachers/${item.id}`}>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-muted border border-border hover:bg-border transition-colors">
                <Image src="/view.png" alt="view" width={16} height={16} className="dark:invert" />
              </button>
            </Link>
            {role === "admin" && (
              <>
                <FormContainer table="teacher" type="update" data={item} id={item.id} />
                <FormContainer table="teacher" type="delete" id={item.id} />
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
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-accent hover:bg-accent/90 transition-colors">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <SortButton />
            {role === "admin" && <FormContainer table="teacher" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={paginated} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default TeacherListPage;
