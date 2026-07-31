"use client";

import Image from "next/image";
import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

const Performance = ({ average }: { average: number }) => {
  const data = [{ name: "Average", value: average, fill: "#27A6F5" }];

  return (
    <div className="bg-white p-4 rounded-md h-80 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Performance</h1>
        <Image src="/moreDark.png" alt="" width={16} height={16} />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="100%"
          barSize={16}
          data={data}
          startAngle={90}
          endAngle={90 - (average / 100) * 360}
        >
          <RadialBar background dataKey="value" />
        </RadialBarChart>
      </ResponsiveContainer>
      <h1 className="font-bold text-3xl absolute top-1/2 left-1/2 -translate-x-1/2">
        {Math.round(average)}%
      </h1>
      <h2 className="font-medium absolute bottom-6 left-0 right-0 mx-auto text-center text-gray-400 text-sm">
        Average score
      </h2>
    </div>
  );
};

export default Performance;
