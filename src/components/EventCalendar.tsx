"use client"

import { title } from "process";
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Image from "next/image";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

//Temporary hardcodedevents data
const events = [
    {
        id: 1,
        title: "Parent-Teacher Meeting",
        time: "12:00 PM - 2:00 PM",
        description: "Discuss student progress and address any concerns with parents."
    },
    {
        id: 2,
        title: "Science Fair",
        time: "10:00 AM - 4:00 PM",
        description: "Showcase student projects and experiments in the school auditorium."
    },
    {
        id: 3,
        title: "Sports Day",
        time: "9:00 AM - 3:00 PM",
        description: "Organize various sports competitions for students of different age groups."
    }
]

const EventCalendar = () => {
    const [value, onChange] = useState<Value>(null);

    return (
        <div className="bg-white p-4 rounded-md">
            <Calendar onChange={onChange} value={value} />
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold my-4">Upcoming Events</h1>
                <Image src="/moreDark.png" alt="" width={20} height={20} />
            </div>
            <div className="flex flex-col gap-4">
                {events.map((event) => (
                    <div className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-skyBlue even:border-t-darkerPurple" 
                    key={event.id}
                    >
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold text-gray-600">{event.title}</h1>
                            <span className="text-gray-300 text-xs">{event.time}</span>
                        </div>
                        <p className="mt-2 text-gray-500 text-sm">{event.description}</p>
                    </div>
                ))}
                </div>
        </div>
    )
}
export default EventCalendar