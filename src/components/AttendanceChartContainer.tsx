import { attendanceData } from "@/lib/data";
import AttendanceChart from "./AttendanceChart";

const DAY_NAMES = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const AttendanceChartContainer = () => {
  const buckets = [1, 2, 3, 4, 5].map((dayIndex) => ({
    name: DAY_NAMES[dayIndex],
    present: 0,
    absent: 0,
  }));

  attendanceData.forEach((a) => {
    const dayIndex = a.date.getDay();
    const bucket = buckets[dayIndex - 1];
    if (!bucket) return;
    if (a.present) bucket.present += 1;
    else bucket.absent += 1;
  });

  return <AttendanceChart data={buckets} />;
};

export default AttendanceChartContainer;
