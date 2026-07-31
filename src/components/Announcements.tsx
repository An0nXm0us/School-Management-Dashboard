import { getSession } from "@/lib/auth";
import { announcementsData, studentsData } from "@/lib/data";

const CARD_COLORS = ["bg-skyBlue", "bg-lightPurple", "bg-lightYellow"];

const Announcements = () => {
  const session = getSession();

  let visible = announcementsData;
  if (session?.role === "student") {
    const student = studentsData.find((s) => s.id === session.userId);
    visible = announcementsData.filter((a) => a.classId === null || a.classId === student?.classId);
  } else if (session?.role === "parent") {
    const classIds = studentsData
      .filter((s) => s.parentId === session.userId)
      .map((s) => s.classId);
    visible = announcementsData.filter((a) => a.classId === null || classIds.includes(a.classId));
  }

  const latest = [...visible]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 3);

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {latest.length === 0 && <p className="text-sm text-gray-400">No announcements yet.</p>}
        {latest.map((a, i) => (
          <div className={`${CARD_COLORS[i % CARD_COLORS.length]} rounded-md p-4`} key={a.id}>
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{a.title}</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                {new Intl.DateTimeFormat("en-ZA", { dateStyle: "medium" }).format(a.date)}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">{a.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
