"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Image from 'next/image';
import { useTheme } from "next-themes";
import { getChartPalette } from "@/lib/chartColors";

const AttendanceChart = ({
  data,
}: {
  data: { name: string; present: number; absent: number }[];
}) => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) {
      return <div className="bg-card border border-border shadow-sm rounded-lg p-4 h-full animate-pulse" />;
    }

    const palette = getChartPalette(resolvedTheme);

    return (
        <div className="bg-card text-card-foreground border border-border shadow-sm rounded-lg p-4 h-full">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Attendance</h1>
                <Image src="/moreDark.png" alt="" width={20} height={20} className="dark:invert" />
            </div>
           <ResponsiveContainer width="100%" height="90%">
            <BarChart width={500} height={300} data={data} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={palette.grid}/>
                <XAxis dataKey="name" axisLine={false} tick={{ fill: palette.tick }} tickLine={false}/>
                <YAxis width="auto" axisLine={false} tick={{ fill: palette.tick }} tickLine={false}/>
                <Tooltip contentStyle={palette.tooltip} />
                <Legend align="left" verticalAlign="top" wrapperStyle={{paddingTop:"20px", paddingBottom:"40px"}}/>
                <Bar dataKey="present" fill={palette.success} legendType='circle' radius={[10, 10, 0, 0]} />
                <Bar dataKey="absent" fill={palette.danger} legendType='circle' radius={[10, 10, 0, 0]} />
            </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
export default AttendanceChart
