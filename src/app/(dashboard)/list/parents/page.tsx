import Image from "next/image";
import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import SortButton from "@/components/SortButton";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { getSession } from "@/lib/auth";
import { parentsData, studentsData } from "@/lib/data";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { applySort } from "@/lib/sortData";
import { Parent } from "@/lib/types";

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Students", accessor: "students", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];

const ParentListPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = getSession();
  const role = session?.role;

  const { page, search, sort } = searchParams;
  const p = page ? parseInt(page) : 1;

  let data = parentsData;
  if (search) {
    const q = search.toLowerCase();
    data = data.filter((par) => par.name.toLowerCase().includes(q) || par.email.toLowerCase().includes(q));
  }
  data = applySort(data, sort, (par) => par.name.toLowerCase());

  const count = data.length;
  const paginated = data.slice((p - 1) * ITEM_PER_PAGE, p * ITEM_PER_PAGE);

  const renderRow = (item: Parent) => {
    const children = studentsData.filter((s) => s.parentId === item.id);
    return (
      <tr
        key={item.id}
        className="border-b border-border even:bg-muted/40 text-sm hover:bg-muted transition-colors"
      >
        <td className="p-4 flex flex-col gap-1">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-muted-foreground">{item.email}</p>
        </td>
        <td className="hidden md:table-cell">{children.map((c) => c.name).join(", ") || "-"}</td>
        <td className="hidden lg:table-cell">{item.phone}</td>
        <td className="hidden lg:table-cell">{item.address}</td>
        <td>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <FormContainer table="parent" type="update" data={item} id={item.id} />
                <FormContainer table="parent" type="delete" id={item.id} />
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
        <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-accent hover:bg-accent/90 transition-colors">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <SortButton />
            {role === "admin" && <FormContainer table="parent" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={paginated} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default ParentListPage;
