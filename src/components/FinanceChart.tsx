"use client";

import Image from "next/image";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
//import { RechartsDevtools } from '@recharts/devtools';

// #region Sample data
const data = [
  {
    name: 'Jan',
    income: 4000,
    expense: 2400
  },
  {
    name: 'Feb',
    income: 3000,
    expense: 1398
  },
  {
    name: 'Mar',
    income: 2000,
    expense: 9800
  },
  {
    name: 'Apr',
    income: 2780,
    expense: 3908
  },
  {
    name: 'May',
    income: 1890,
    expense: 4800
  },
  {
    name: 'June',
    income: 2390,
    expense: 3800
  },
  {
    name: 'July',
    income: 3490,
    expense: 4300
  },  
  {
    name: 'Aug',
    income: 2780,
    expense: 3908
  },
  {
    name: 'Sept',
    income: 1890,
    expense: 4800
  },
  {
    name: 'Oct',
    income: 2390,
    expense: 3800
  },
  {
    name: 'Nov',
    income: 3490,
    expense: 4300
  },
  {
    name: 'Dec',
    income: 4000,
    expense: 2400
  }
];

//Last edit 01:01:42
const FinanceChart = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Finance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>

      <LineChart
        style={{ width: '100%', maxWidth: '700px', height: '100%', maxHeight: '70vh' }}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis width={40} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="expense" stroke="#82ca9d" />
      </LineChart>
    </div>
  )
}

export default FinanceChart