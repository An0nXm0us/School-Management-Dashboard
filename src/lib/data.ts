// MOCK DATA — stands in for the future Supabase database (see prisma/schema.prisma).
// Ids are foreign keys between the arrays below (e.g. Student.classId -> Class.id).
// Reverse relations (e.g. "which students are in this class") are derived with
// .filter() in the pages/components that need them, rather than duplicated here.

import {
  Announcement,
  Assignment,
  Attendance,
  Class,
  Event,
  Exam,
  Grade,
  Lesson,
  Parent,
  Result,
  Student,
  Subject,
  Teacher,
} from "./types";

// Dates are generated relative to "today" so exams/events/attendance always look
// current, instead of the fixed-2025 dates this mock data shipped with before.
const inDays = (days: number, hour: number, minute = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, minute, 0, 0);
  return d;
};

export const gradesData: Grade[] = [
  { id: 1, level: 8 },
  { id: 2, level: 9 },
  { id: 3, level: 10 },
  { id: 4, level: 11 },
  { id: 5, level: 12 },
];

export const subjectsData: Subject[] = [
  { id: 1, name: "Math" },
  { id: 2, name: "English" },
  { id: 3, name: "Physics" },
  { id: 4, name: "Chemistry" },
  { id: 5, name: "Biology" },
  { id: 6, name: "History" },
  { id: 7, name: "Geography" },
  { id: 8, name: "Art" },
  { id: 9, name: "Music" },
  { id: 10, name: "Literature" },
];

export const classesData: Class[] = [
  { id: 1, name: "8A", capacity: 30, gradeId: 1, supervisorId: 1 },
  { id: 2, name: "8B", capacity: 28, gradeId: 1, supervisorId: 2 },
  { id: 3, name: "9A", capacity: 32, gradeId: 2, supervisorId: 3 },
  { id: 4, name: "9B", capacity: 30, gradeId: 2, supervisorId: 4 },
  { id: 5, name: "10A", capacity: 29, gradeId: 3, supervisorId: 5 },
  { id: 6, name: "10B", capacity: 27, gradeId: 3, supervisorId: 6 },
  { id: 7, name: "11A", capacity: 25, gradeId: 4, supervisorId: 7 },
  { id: 8, name: "11B", capacity: 26, gradeId: 4, supervisorId: 8 },
  { id: 9, name: "12A", capacity: 22, gradeId: 5, supervisorId: 9 },
  { id: 10, name: "12B", capacity: 20, gradeId: 5, supervisorId: 10 },
];

export const teachersData: Teacher[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@doe.com",
    phone: "1234567890",
    address: "123 Main St, Anytown, USA",
    img: "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bloodType: "O+",
    sex: "MALE",
    birthday: "1985-03-12",
    subjectIds: [1],
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@doe.com",
    phone: "1234567891",
    address: "123 Main St, Anytown, USA",
    img: "https://images.pexels.com/photos/936126/pexels-photo-936126.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bloodType: "A+",
    sex: "FEMALE",
    birthday: "1988-07-22",
    subjectIds: [3, 4],
  },
  {
    id: 3,
    name: "Mike Geller",
    email: "mike@geller.com",
    phone: "1234567892",
    address: "123 Main St, Anytown, USA",
    img: "https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bloodType: "B+",
    sex: "MALE",
    birthday: "1979-11-02",
    subjectIds: [5],
  },
  {
    id: 4,
    name: "Jay French",
    email: "jay@gmail.com",
    phone: "1234567893",
    address: "123 Main St, Anytown, USA",
    img: "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bloodType: "AB+",
    sex: "MALE",
    birthday: "1982-01-30",
    subjectIds: [6],
  },
  {
    id: 5,
    name: "Jane Smith",
    email: "jane@gmail.com",
    phone: "1234567894",
    address: "123 Main St, Anytown, USA",
    img: "https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bloodType: "O-",
    sex: "FEMALE",
    birthday: "1990-09-15",
    subjectIds: [9, 6],
  },
  {
    id: 6,
    name: "Anna Santiago",
    email: "anna@gmail.com",
    phone: "1234567895",
    address: "123 Main St, Anytown, USA",
    img: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bloodType: "A-",
    sex: "FEMALE",
    birthday: "1984-05-18",
    subjectIds: [3],
  },
  {
    id: 7,
    name: "Allen Black",
    email: "allen@black.com",
    phone: "1234567896",
    address: "123 Main St, Anytown, USA",
    img: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bloodType: "B-",
    sex: "MALE",
    birthday: "1977-12-08",
    subjectIds: [2],
  },
  {
    id: 8,
    name: "Ophelia Castro",
    email: "ophelia@castro.com",
    phone: "1234567897",
    address: "123 Main St, Anytown, USA",
    img: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bloodType: "O+",
    sex: "FEMALE",
    birthday: "1991-02-27",
    subjectIds: [1],
  },
  {
    id: 9,
    name: "Derek Briggs",
    email: "derek@briggs.com",
    phone: "1234567898",
    address: "123 Main St, Anytown, USA",
    img: "https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bloodType: "AB-",
    sex: "MALE",
    birthday: "1983-06-05",
    subjectIds: [10, 2],
  },
  {
    id: 10,
    name: "John Glover",
    email: "john@glover.com",
    phone: "1234567899",
    address: "123 Main St, Anytown, USA",
    img: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bloodType: "A+",
    sex: "MALE",
    birthday: "1986-10-19",
    subjectIds: [5],
  },
];

export const parentsData: Parent[] = [
  { id: 1, name: "Robert Brewer", email: "robert@brewer.com", phone: "2234567890", address: "12 Oak St, Anytown, USA" },
  { id: 2, name: "Carla Bradley", email: "carla@bradley.com", phone: "2234567891", address: "14 Oak St, Anytown, USA" },
  { id: 3, name: "Frank Caldwell", email: "frank@caldwell.com", phone: "2234567892", address: "16 Oak St, Anytown, USA" },
  { id: 4, name: "Molly Fitzgerald", email: "molly@fitzgerald.com", phone: "2234567893", address: "18 Oak St, Anytown, USA" },
  { id: 5, name: "Harvey Mable", email: "harvey@mable.com", phone: "2234567894", address: "20 Oak St, Anytown, USA" },
  { id: 6, name: "Joel Lambert", email: "joel@lambert.com", phone: "2234567895", address: "22 Oak St, Anytown, USA" },
  { id: 7, name: "Carrie Tucker", email: "carrie@tucker.com", phone: "2234567896", address: "24 Oak St, Anytown, USA" },
  { id: 8, name: "Alexander Blair", email: "alexander@blair.com", phone: "2234567897", address: "26 Oak St, Anytown, USA" },
  { id: 9, name: "Susan Webster", email: "susan@webster.com", phone: "2234567898", address: "28 Oak St, Anytown, USA" },
  { id: 10, name: "Stella Scott", email: "stella@scott.com", phone: "2234567899", address: "30 Oak St, Anytown, USA" },
];

export const studentsData: Student[] = [
  {
    id: 1,
    name: "Sarah Brewer",
    email: "sarah.brewer@student.school.co.za",
    phone: "3234567890",
    address: "12 Oak St, Anytown, USA",
    img: "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bloodType: "O+",
    sex: "FEMALE",
    birthday: "2011-04-14",
    parentId: 1,
    classId: 1,
    gradeId: 1,
  },
  {
    id: 2,
    name: "Cecilia Bradley",
    email: "cecilia.bradley@student.school.co.za",
    phone: "3234567891",
    address: "14 Oak St, Anytown, USA",
    img: "https://images.pexels.com/photos/936126/pexels-photo-936126.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bloodType: "A+",
    sex: "FEMALE",
    birthday: "2010-08-02",
    parentId: 2,
    classId: 2,
    gradeId: 1,
  },
  {
    id: 3,
    name: "Fanny Caldwell",
    email: "fanny.caldwell@student.school.co.za",
    phone: "3234567892",
    address: "16 Oak St, Anytown, USA",
    img: "https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bloodType: "B+",
    sex: "FEMALE",
    birthday: "2009-01-21",
    parentId: 3,
    classId: 3,
    gradeId: 2,
  },
  {
    id: 4,
    name: "Mollie Fitzgerald",
    email: "mollie.fitzgerald@student.school.co.za",
    phone: "3234567893",
    address: "18 Oak St, Anytown, USA",
    img: "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bloodType: "AB+",
    sex: "FEMALE",
    birthday: "2009-11-09",
    parentId: 4,
    classId: 4,
    gradeId: 2,
  },
  {
    id: 5,
    name: "Mable Harvey",
    email: "mable.harvey@student.school.co.za",
    phone: "3234567894",
    address: "20 Oak St, Anytown, USA",
    img: "https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bloodType: "O-",
    sex: "FEMALE",
    birthday: "2008-06-17",
    parentId: 5,
    classId: 5,
    gradeId: 3,
  },
  {
    id: 6,
    name: "Joel Lambert",
    email: "joel.lambert@student.school.co.za",
    phone: "3234567895",
    address: "22 Oak St, Anytown, USA",
    img: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bloodType: "A-",
    sex: "MALE",
    birthday: "2008-02-25",
    parentId: 6,
    classId: 6,
    gradeId: 3,
  },
  {
    id: 7,
    name: "Carrie Tucker",
    email: "carrie.tucker@student.school.co.za",
    phone: "3234567896",
    address: "24 Oak St, Anytown, USA",
    img: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bloodType: "B-",
    sex: "FEMALE",
    birthday: "2007-09-30",
    parentId: 7,
    classId: 7,
    gradeId: 4,
  },
  {
    id: 8,
    name: "Alexander Blair",
    email: "alexander.blair@student.school.co.za",
    phone: "3234567897",
    address: "26 Oak St, Anytown, USA",
    img: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bloodType: "O+",
    sex: "MALE",
    birthday: "2007-12-11",
    parentId: 8,
    classId: 8,
    gradeId: 4,
  },
  {
    id: 9,
    name: "Susan Webster",
    email: "susan.webster@student.school.co.za",
    phone: "3234567898",
    address: "28 Oak St, Anytown, USA",
    img: "https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bloodType: "AB-",
    sex: "FEMALE",
    birthday: "2006-03-05",
    parentId: 9,
    classId: 9,
    gradeId: 5,
  },
  {
    id: 10,
    name: "Stella Scott",
    email: "stella.scott@student.school.co.za",
    phone: "3234567899",
    address: "30 Oak St, Anytown, USA",
    img: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1200",
    bloodType: "A+",
    sex: "FEMALE",
    birthday: "2006-10-23",
    parentId: 10,
    classId: 10,
    gradeId: 5,
  },
];

// Two lessons per class: the first (odd ids) is what exams/attendance below hang off.
export const lessonsData: Lesson[] = [
  { id: 1, name: "Math", day: "MONDAY", startTime: "08:00", endTime: "08:45", subjectId: 1, classId: 1, teacherId: 1 },
  { id: 2, name: "English", day: "TUESDAY", startTime: "09:00", endTime: "09:45", subjectId: 2, classId: 1, teacherId: 7 },
  { id: 3, name: "Physics", day: "MONDAY", startTime: "09:00", endTime: "09:45", subjectId: 3, classId: 2, teacherId: 2 },
  { id: 4, name: "Chemistry", day: "WEDNESDAY", startTime: "10:00", endTime: "10:45", subjectId: 4, classId: 2, teacherId: 2 },
  { id: 5, name: "Biology", day: "MONDAY", startTime: "10:00", endTime: "10:45", subjectId: 5, classId: 3, teacherId: 3 },
  { id: 6, name: "History", day: "TUESDAY", startTime: "08:00", endTime: "08:45", subjectId: 6, classId: 3, teacherId: 4 },
  { id: 7, name: "History", day: "MONDAY", startTime: "11:00", endTime: "11:45", subjectId: 6, classId: 4, teacherId: 4 },
  { id: 8, name: "Math", day: "THURSDAY", startTime: "08:00", endTime: "08:45", subjectId: 1, classId: 4, teacherId: 1 },
  { id: 9, name: "Music", day: "WEDNESDAY", startTime: "09:00", endTime: "09:45", subjectId: 9, classId: 5, teacherId: 5 },
  { id: 10, name: "History", day: "FRIDAY", startTime: "10:00", endTime: "10:45", subjectId: 6, classId: 5, teacherId: 5 },
  { id: 11, name: "Physics", day: "TUESDAY", startTime: "11:00", endTime: "11:45", subjectId: 3, classId: 6, teacherId: 6 },
  { id: 12, name: "English", day: "THURSDAY", startTime: "09:00", endTime: "09:45", subjectId: 2, classId: 6, teacherId: 7 },
  { id: 13, name: "English", day: "MONDAY", startTime: "13:00", endTime: "13:45", subjectId: 2, classId: 7, teacherId: 7 },
  { id: 14, name: "Literature", day: "WEDNESDAY", startTime: "13:00", endTime: "13:45", subjectId: 10, classId: 7, teacherId: 9 },
  { id: 15, name: "Math", day: "TUESDAY", startTime: "13:00", endTime: "13:45", subjectId: 1, classId: 8, teacherId: 8 },
  { id: 16, name: "Biology", day: "THURSDAY", startTime: "10:00", endTime: "10:45", subjectId: 5, classId: 8, teacherId: 10 },
  { id: 17, name: "Literature", day: "MONDAY", startTime: "14:00", endTime: "14:45", subjectId: 10, classId: 9, teacherId: 9 },
  { id: 18, name: "English", day: "FRIDAY", startTime: "09:00", endTime: "09:45", subjectId: 2, classId: 9, teacherId: 9 },
  { id: 19, name: "Biology", day: "TUESDAY", startTime: "14:00", endTime: "14:45", subjectId: 5, classId: 10, teacherId: 10 },
  { id: 20, name: "Math", day: "THURSDAY", startTime: "14:00", endTime: "14:45", subjectId: 1, classId: 10, teacherId: 8 },
];

const examTitles = [
  "Math Assessment", "Physics Assessment", "Biology Assessment", "History Assessment",
  "Music Assessment", "Physics Assessment", "English Assessment", "Math Assessment",
  "Literature Assessment", "Biology Assessment",
];
const examOffsets = [5, 6, 4, 7, 3, 8, 2, 9, 6, 10];
const examHours = [8, 9, 10, 11, 9, 11, 13, 13, 14, 14];

export const examsData: Exam[] = examTitles.map((title, i) => ({
  id: i + 1,
  title,
  startTime: inDays(examOffsets[i], examHours[i]),
  endTime: inDays(examOffsets[i], examHours[i] + 1),
  lessonId: i * 2 + 1, // the "first" lesson of class i+1
}));

const assignmentTitles = [
  "Math Homework", "English Homework", "Chemistry Homework", "Math Homework",
  "History Homework", "English Homework", "Literature Homework", "Math Homework",
  "English Homework", "Biology Homework",
];
const assignmentDue = [2, 4, 3, 6, 5, 3, 7, 4, 6, 5];

export const assignmentsData: Assignment[] = assignmentTitles.map((title, i) => ({
  id: i + 1,
  title,
  startDate: inDays(-3, 8),
  dueDate: inDays(assignmentDue[i], 23, 59),
  lessonId: i * 2 + 2, // the "second" lesson of class i+1
}));

export const resultsData: Result[] = [
  ...studentsData.map((s, i) => ({
    id: i + 1,
    score: 65 + ((i * 7) % 35),
    studentId: s.id,
    examId: examsData[i].id,
    assignmentId: null,
  })),
  ...studentsData.map((s, i) => ({
    id: studentsData.length + i + 1,
    score: 60 + ((i * 5) % 40),
    studentId: s.id,
    examId: null,
    assignmentId: assignmentsData[i].id,
  })),
];

export const attendanceData: Attendance[] = studentsData.flatMap((s, i) => {
  const lessonId = i * 2 + 1;
  return [
    { id: i * 3 + 1, date: inDays(-1, 8), present: true, studentId: s.id, lessonId },
    { id: i * 3 + 2, date: inDays(-3, 8), present: i % 5 !== 0, studentId: s.id, lessonId },
    { id: i * 3 + 3, date: inDays(-6, 8), present: true, studentId: s.id, lessonId },
  ];
});

export const eventsData: Event[] = [
  { id: 1, title: "Parent-Teacher Meeting", description: "Discuss student progress with parents.", startTime: inDays(3, 12), endTime: inDays(3, 14), classId: null },
  { id: 2, title: "Science Fair", description: "Showcase student projects and experiments.", startTime: inDays(10, 10), endTime: inDays(10, 16), classId: null },
  { id: 3, title: "Sports Day", description: "Inter-house sports competitions.", startTime: inDays(14, 9), endTime: inDays(14, 15), classId: null },
  { id: 4, title: "8A Field Trip", description: "Lake trip for grade 8A.", startTime: inDays(5, 10), endTime: inDays(5, 15), classId: 1 },
  { id: 5, title: "8B Museum Visit", description: "History museum excursion.", startTime: inDays(6, 9), endTime: inDays(6, 13), classId: 2 },
  { id: 6, title: "9A Career Talk", description: "Guest speaker on STEM careers.", startTime: inDays(2, 11), endTime: inDays(2, 12), classId: 3 },
  { id: 7, title: "9B Debate", description: "Inter-class debate afternoon.", startTime: inDays(8, 13), endTime: inDays(8, 15), classId: 4 },
  { id: 8, title: "10A Music Concert", description: "End-of-term music showcase.", startTime: inDays(12, 17), endTime: inDays(12, 19), classId: 5 },
  { id: 9, title: "11A Mock Exams Briefing", description: "Preparing for upcoming mocks.", startTime: inDays(1, 8), endTime: inDays(1, 9), classId: 7 },
  { id: 10, title: "12A Matric Farewell Planning", description: "Committee planning session.", startTime: inDays(15, 16), endTime: inDays(15, 18), classId: 9 },
];

export const announcementsData: Announcement[] = [
  { id: 1, title: "New School Policy Update", description: "Please review the updated school policies and their implementation timeline.", date: inDays(-1, 8), classId: null },
  { id: 2, title: "Load-Shedding Schedule", description: "Updated Eskom load-shedding stages affecting afternoon classes this week.", date: inDays(-2, 8), classId: null },
  { id: 3, title: "Library Hours Extended", description: "The library will stay open until 17:00 during exam weeks.", date: inDays(-3, 8), classId: null },
  { id: 4, title: "8A Math Test", description: "Reminder: bring your calculator and ID.", date: inDays(2, 8), classId: 1 },
  { id: 5, title: "9A Field Trip Consent Forms", description: "Consent forms due by end of week.", date: inDays(1, 8), classId: 3 },
  { id: 6, title: "10B Textbook Return", description: "Please return borrowed textbooks by Friday.", date: inDays(4, 8), classId: 6 },
  { id: 7, title: "11A Study Group", description: "Voluntary after-school study group starting this week.", date: inDays(3, 8), classId: 7 },
  { id: 8, title: "12A Matric Exam Timetable", description: "Final exam timetable has been published.", date: inDays(0, 8), classId: 9 },
  { id: 9, title: "12B Career Guidance", description: "Sign up for one-on-one career guidance sessions.", date: inDays(5, 8), classId: 10 },
  { id: 10, title: "Uniform Policy Reminder", description: "Full winter uniform is compulsory from next Monday.", date: inDays(6, 8), classId: null },
];
