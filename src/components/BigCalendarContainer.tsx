import { classesData, lessonsData, subjectsData } from "@/lib/data";
import { Day } from "@/lib/types";
import BigCalendar from "./BigCalendar";

const DAY_INDEX: Record<Day, number> = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
};

// Lessons only store a day-of-week + "HH:mm" (they recur weekly), so this
// projects them onto concrete Date objects for "this week" every time it renders.
function dateForThisWeek(day: Day, time: string): Date {
  const now = new Date();
  const currentDay = now.getDay() === 0 ? 7 : now.getDay();
  const diff = DAY_INDEX[day] - currentDay;
  const [hours, minutes] = time.split(":").map(Number);

  const date = new Date(now);
  date.setDate(now.getDate() + diff);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

const BigCalendarContainer = ({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: number;
}) => {
  const lessons = lessonsData.filter((l) =>
    type === "teacherId" ? l.teacherId === id : l.classId === id
  );

  const data = lessons.map((l) => {
    const subject = subjectsData.find((s) => s.id === l.subjectId);
    const cls = classesData.find((c) => c.id === l.classId);
    return {
      title: type === "teacherId" ? `${subject?.name ?? l.name} (${cls?.name ?? ""})` : subject?.name ?? l.name,
      start: dateForThisWeek(l.day, l.startTime),
      end: dateForThisWeek(l.day, l.endTime),
    };
  });

  return <BigCalendar data={data} />;
};

export default BigCalendarContainer;
