// Mirrors the shape of prisma/schema.prisma, but kept pragmatic for the mock-data
// runtime: numeric ids everywhere instead of Prisma's cuid strings, and a single
// `name` field instead of name/surname. Swapping this layer for real Supabase rows
// later is a mechanical id-type change, not a redesign.

export type UserSex = "MALE" | "FEMALE";
export type Day = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY";
export type Role = "admin" | "teacher" | "student" | "parent";

export interface Grade {
  id: number;
  level: number;
}

export interface Subject {
  id: number;
  name: string;
}

export interface Class {
  id: number;
  name: string;
  capacity: number;
  gradeId: number;
  supervisorId: number | null;
}

export interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  img: string;
  bloodType: string;
  sex: UserSex;
  birthday: string;
  subjectIds: number[];
}

export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  img: string;
  bloodType: string;
  sex: UserSex;
  birthday: string;
  parentId: number;
  classId: number;
  gradeId: number;
}

export interface Parent {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Lesson {
  id: number;
  name: string;
  day: Day;
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  subjectId: number;
  classId: number;
  teacherId: number;
}

export interface Exam {
  id: number;
  title: string;
  startTime: Date;
  endTime: Date;
  lessonId: number;
}

export interface Assignment {
  id: number;
  title: string;
  startDate: Date;
  dueDate: Date;
  lessonId: number;
}

export interface Result {
  id: number;
  score: number;
  studentId: number;
  examId: number | null;
  assignmentId: number | null;
}

export interface Attendance {
  id: number;
  date: Date;
  present: boolean;
  studentId: number;
  lessonId: number;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  classId: number | null;
}

export interface Announcement {
  id: number;
  title: string;
  description: string;
  date: Date;
  classId: number | null;
}
