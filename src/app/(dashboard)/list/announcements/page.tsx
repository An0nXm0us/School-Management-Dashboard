import Image from "next/image";
import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import SortButton from "@/components/SortButton";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { getSession } from "@/lib/auth";
import { announcementsData, classesData } from "@/lib/data";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { applySort } from "@/lib/sortData";
import { Announcement } from "@/lib/types";

const columns = [
  { header: "Title", accessor: "title" },
  { header: "Class", accessor: "class", className: "hidden md:table-cell" },
  { header: "Date", accessor: "date", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "action" },
];

const AnnouncementListPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = getSession();
  const role = session?.role;

  const { page, search, sort } = searchParams;
  const p = page ? parseInt(page) : 1;

  let data = announcementsData;
  if (search) {
    data = data.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()));
  }
  data = applySort(data, sort, (a) => a.date.getTime());

  const count = data.length;
  const paginated = data.slice((p - 1) * ITEM_PER_PAGE, p * ITEM_PER_PAGE);

  const renderRow = (item: Announcement) => {
    const cls = classesData.find((c) => c.id === item.classId);
    return (
      <tr
        key={item.id}
        className="border-b border-border even:bg-muted/40 text-sm hover:bg-muted transition-colors"
      >
        <td className="p-4 font-medium">{item.title}</td>
        <td className="hidden md:table-cell">{cls?.name ?? "Whole school"}</td>
        <td className="hidden md:table-cell">
          {new Intl.DateTimeFormat("en-ZA", { dateStyle: "medium" }).format(item.date)}
        </td>
        <td>
          <div className="flex items-center gap-2">
            {(role === "admin" || role === "teacher") && (
              <>
                <FormContainer table="announcement" type="update" data={item} id={item.id} />
                <FormContainer table="announcement" type="delete" id={item.id} />
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
        <h1 className="hidden md:block text-lg font-semibold">All Announcements</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-accent hover:bg-accent/90 transition-colors">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <SortButton />
            {(role === "admin" || role === "teacher") && (
              <FormContainer table="announcement" type="create" />
            )}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={paginated} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default AnnouncementListPage;
