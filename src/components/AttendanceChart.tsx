"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { RechartsDevtools } from '@recharts/devtools';
import Image from 'next/image';

// #region Sample data
const data = [
  {
    name: 'Mon',
    present: 400,
    absent: 10,
    
  },
  {
    name: 'Tues',
    present: 400,
    absent: 10,
  },
  {
    name: 'Wed',
    present: 409,
    absent: 1,
  },
  {
    name: 'Thurs',
    present: 390,
    absent: 20,
  },
  {
    name: 'Fri',
    present: 410,
    absent: 0,
  },
  
];

const AttendanceChart = () => {
    return (
        <div className="bg-white rounded-lg p-4 h-full">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Attendance</h1>
                <Image src="/moreDark.png" alt="" width={20} height={20} />
            </div>
           <ResponsiveContainer width="100%" height="90%"> 
            <BarChart width={500} height={300} data={data} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#ddd'/>
                <XAxis dataKey="name" axisLine={false} tick={{fill:'#d1d5db'}} tickLine={false}/>
                <YAxis width="auto" axisLine={false} tick={{fill:'#d1d5db'}} tickLine={false}/>
                <Tooltip contentStyle={{borderRadius:"10px",borderColor:"lightgray"}}/>
                <Legend align="left" verticalAlign="top" wrapperStyle={{paddingTop:"20px", paddingBottom:"40px"}}/>
                <Bar dataKey="present" fill="#FAE27C" legendType='circle' radius={[10, 10, 0, 0]} />
                <Bar dataKey="absent" fill="skyBlue" legendType='circle' radius={[10, 10, 0, 0]} />
                {/* <RechartsDevtools /> */}
            </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
export default AttendanceChart