import { studentsData } from "@/lib/data";
import CountChart from "./CountChart";

const CountChartContainer = () => {
  const boys = studentsData.filter((s) => s.sex === "MALE").length;
  const girls = studentsData.filter((s) => s.sex === "FEMALE").length;

  return <CountChart boys={boys} girls={girls} />;
};

export default CountChartContainer;
