import Image from "next/image";
import { getSession } from "@/lib/auth";
import { eventsData, studentsData } from "@/lib/data";
import EventCalendar from "./EventCalendar";

const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

const EventCalendarContainer = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = getSession();
  const selectedDate = searchParams.date ? new Date(searchParams.date) : new Date();

  let visible = eventsData;
  if (session?.role === "student") {
    const student = studentsData.find((s) => s.id === session.userId);
    visible = eventsData.filter((e) => e.classId === null || e.classId === student?.classId);
  } else if (session?.role === "parent") {
    const classIds = studentsData
      .filter((s) => s.parentId === session.userId)
      .map((s) => s.classId);
    visible = eventsData.filter((e) => e.classId === null || classIds.includes(e.classId));
  }

  const onSelectedDay = visible.filter((e) => sameDay(e.startTime, selectedDate));
  const shown = onSelectedDay.length
    ? onSelectedDay
    : visible
        .filter((e) => e.startTime.getTime() >= Date.now())
        .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
        .slice(0, 3);

  return (
    <div className="bg-card text-card-foreground border border-border shadow-sm p-4 rounded-xl">
      <EventCalendar />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">
          {onSelectedDay.length ? "Events on this day" : "Upcoming Events"}
        </h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} className="dark:invert" />
      </div>
      <div className="flex flex-col gap-4">
        {shown.length === 0 && <p className="text-sm text-muted-foreground">No events.</p>}
        {shown.map((event, i) => (
          <div
            className={`p-5 rounded-md border border-border border-t-4 ${
              i % 2 === 0 ? "border-t-accent" : "border-t-tagPurple"
            }`}
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold">{event.title}</h1>
              <span className="text-muted-foreground text-xs">
                {event.startTime.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" })} -{" "}
                {event.endTime.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <p className="mt-2 text-muted-foreground text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendarContainer;
