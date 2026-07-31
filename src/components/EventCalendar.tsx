"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (value instanceof Date) {
      const params = new URLSearchParams(searchParams);
      params.set("date", value.toISOString().slice(0, 10));
      router.replace(`${pathname}?${params}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <Calendar onChange={onChange} value={value} />;
};

export default EventCalendar;
