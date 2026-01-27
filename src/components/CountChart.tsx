"use client";

import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import Image from 'next/image';

const data = [
  {
    name: "Total",
    count: 105,
    fill: "white",
  },
  {
    name: "Girls",
    count: 53,
    fill: '#8884d8',
  },
  {
    name: "Boys",
    count: 52,
    fill: '#83a6ed',
  },
];

// #endregion
const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};

const CountChart = () => {
    return (
        <div className="bg-white rounded-xl w-full h-full p-4">
            {/* Title */}
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Students</h1>
                <Image src="/moreDark.png" alt="" width={20} height={20} />
            </div>
            {/* Chart */}
            <div className="w-full h-[75%]">
                { <ResponsiveContainer >
                    <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
                        <RadialBar 
                            label={{ position: 'insideStart', fill: '#fff' }}
                            background 
                            dataKey="count" 
                        />
                        <Legend iconSize={10} layout="vertical" verticalAlign="middle" />
                     </RadialBarChart>
                </ResponsiveContainer> }
            </div>
            {/*Bottom*/}
            <div className="flex justify-center gap-16">
                <div className="flex flex-col gap-1">
                    <div className="w-5 h-5 bg-skyBlue rounded-full"/>
                    <h1 className="font-bold">1,234</h1>
                    <h2 className="text-xs text-gray-300">Boys (55%)</h2>
                </div>
            
                <div className="flex flex-col gap-1">
                    <div className="w-5 h-5 bg-darkerYellow rounded-full"/>
                    <h1 className="font-bold">1,234</h1>
                    <h2 className="text-xs text-gray-300">Girls (45%)</h2>
                </div>
            </div>
        </div>
    )
}
export default CountChart