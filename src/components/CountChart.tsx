"use client";

import { useEffect, useState } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import Image from "next/image";
import { useTheme } from "next-themes";
import { getChartPalette } from "@/lib/chartColors";

const CountChart = ({ boys, girls }: { boys: number; girls: number }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const total = boys + girls;
  const boysPct = total ? Math.round((boys / total) * 100) : 0;
  const girlsPct = total ? Math.round((girls / total) * 100) : 0;

  if (!mounted) {
    return <div className="bg-card border border-border shadow-sm rounded-xl w-full h-full p-4 animate-pulse" />;
  }

  const palette = getChartPalette(resolvedTheme);
  const data = [
    { name: "Total", count: total || 1, fill: palette.track },
    { name: "Girls", count: girls, fill: palette.amber },
    { name: "Boys", count: boys, fill: palette.accent },
  ];

  return (
    <div className="bg-card text-card-foreground border border-border shadow-sm rounded-xl w-full h-full p-4">
      {/* Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} className="dark:invert" />
      </div>
      {/* Chart */}
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt=""
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/*Bottom*/}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: palette.accent }} />
          <h1 className="font-bold">{boys}</h1>
          <h2 className="text-xs text-muted-foreground">Boys ({boysPct}%)</h2>
        </div>

        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: palette.amber }} />
          <h1 className="font-bold">{girls}</h1>
          <h2 className="text-xs text-muted-foreground">Girls ({girlsPct}%)</h2>
        </div>
      </div>
    </div>
  );
};
export default CountChart;
