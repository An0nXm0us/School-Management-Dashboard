"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSession } from "./auth";
import {
  announcementsData,
  assignmentsData,
  classesData,
  eventsData,
  examsData,
  lessonsData,
  parentsData,
  studentsData,
  subjectsData,
  teachersData,
} from "./data";
import { Role } from "./types";
import {
  AnnouncementSchema,
  AssignmentSchema,
  ClassSchema,
  EventSchema,
  ExamSchema,
  LessonSchema,
  ParentSchema,
  StudentSchema,
  SubjectSchema,
  TeacherSchema,
} from "./formValidationSchemas";

export async function signIn(role: Role, formData: FormData) {
  const userId = Number(formData.get("userId"));

  cookies().set("role", role, { httpOnly: true, sameSite: "lax", path: "/" });
  cookies().set("userId", String(userId), { httpOnly: true, sameSite: "lax", path: "/" });

  redirect(`/${role}`);
}

export async function signOut() {
  cookies().delete("role");
  cookies().delete("userId");
  redirect("/sign-in");
}

// ---- shared mutation helpers -------------------------------------------------

export type ActionResult = { success: boolean; error: boolean; message?: string };

function requireRole(allowed: Role[]): ActionResult | null {
  const session = getSession();
  if (!session || !allowed.includes(session.role)) {
    return { success: false, error: true, message: "You're not authorized to do that." };
  }
  return null;
}

function nextId(items: { id: number }[]): number {
  return items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
}

// "None" options in optional relation <select>s submit "" which zod's
// z.coerce.number() turns into 0, not undefined — normalize that to null here.
function toIdOrNull(n?: number | null): number | null {
  return n && n > 0 ? n : null;
}

// ---- Subject -------------------------------------------------------------

export async function createSubject(data: SubjectSchema): Promise<ActionResult> {
  const denied = requireRole(["admin"]);
  if (denied) return denied;

  subjectsData.push({ id: nextId(subjectsData), name: data.name });
  revalidatePath("/list/subjects");
  return { success: true, error: false };
}

export async function updateSubject(data: SubjectSchema): Promise<ActionResult> {
  const denied = requireRole(["admin"]);
  if (denied) return denied;

  const subject = subjectsData.find((s) => s.id === data.id);
  if (!subject) return { success: false, error: true, message: "Subject not found." };
  subject.name = data.name;

  revalidatePath("/list/subjects");
  return { success: true, error: false };
}

export async function deleteSubject(id: number): Promise<ActionResult> {
  const denied = requireRole(["admin"]);
  if (denied) return denied;

  const index = subjectsData.findIndex((s) => s.id === id);
  if (index !== -1) subjectsData.splice(index, 1);

  revalidatePath("/list/subjects");
  return { success: true, error: false };
}

// ---- Grade is reference data only (seeded from data.ts, not editable via UI) --

// ---- Class -----------------------------------------------------------------

export async function createClass(data: ClassSchema): Promise<ActionResult> {
  const denied = requireRole(["admin"]);
  if (denied) return denied;

  classesData.push({
    id: nextId(classesData),
    name: data.name,
    capacity: data.capacity,
    gradeId: data.gradeId,
    supervisorId: toIdOrNull(data.supervisorId),
  });
  revalidatePath("/list/classes");
  return { success: true, error: false };
}

export async function updateClass(data: ClassSchema): Promise<ActionResult> {
  const denied = requireRole(["admin"]);
  if (denied) return denied;

  const cls = classesData.find((c) => c.id === data.id);
  if (!cls) return { success: false, error: true, message: "Class not found." };
  cls.name = data.name;
  cls.capacity = data.capacity;
  cls.gradeId = data.gradeId;
  cls.supervisorId = toIdOrNull(data.supervisorId);

  revalidatePath("/list/classes");
  return { success: true, error: false };
}

export async function deleteClass(id: number): Promise<ActionResult> {
  const denied = requireRole(["admin"]);
  if (denied) return denied;

  const index = classesData.findIndex((c) => c.id === id);
  if (index !== -1) classesData.splice(index, 1);

  revalidatePath("/list/classes");
  return { success: true, error: false };
}

// ---- Parent ------------------------------------------------------------------

export async function createParent(data: ParentSchema): Promise<ActionResult> {
  const denied = requireRole(["admin"]);
  if (denied) return denied;

  parentsData.push({
    id: nextId(parentsData),
    name: data.name,
    email: data.email,
    phone: data.phone,
    address: data.address,
  });
  revalidatePath("/list/parents");
  return { success: true, error: false };
}

export async function updateParent(data: ParentSchema): Promise<ActionResult> {
  const denied = requireRole(["admin"]);
  if (denied) return denied;

  const parent = parentsData.find((p) => p.id === data.id);
  if (!parent) return { success: false, error: true, message: "Parent not found." };
  parent.name = data.name;
  parent.email = data.email;
  parent.phone = data.phone;
  parent.address = data.address;

  revalidatePath("/list/parents");
  return { success: true, error: false };
}

export async function deleteParent(id: number): Promise<ActionResult> {
  const denied = requireRole(["admin"]);
  if (denied) return denied;

  const index = parentsData.findIndex((p) => p.id === id);
  if (index !== -1) parentsData.splice(index, 1);

  revalidatePath("/list/parents");
  return { success: true, error: false };
}

// ---- Teacher -------------------------------------------------------------

export async function createTeacher(data: TeacherSchema): Promise<ActionResult> {
  const denied = requireRole(["admin"]);
  if (denied) return denied;

  teachersData.push({
    id: nextId(teachersData),
    name: data.name,
    email: data.email,
    phone: data.phone,
    address: data.address,
    img: data.img || "/avatar.png",
    bloodType: data.bloodType,
    sex: data.sex,
    birthday: data.birthday,
    subjectIds: data.subjectIds ?? [],
  });
  revalidatePath("/list/teachers");
  return { success: true, error: false };
}

export async function updateTeacher(data: TeacherSchema): Promise<ActionResult> {
  const denied = requireRole(["admin"]);
  if (denied) return denied;

  const teacher = teachersData.find((t) => t.id === data.id);
  if (!teacher) return { success: false, error: true, message: "Teacher not found." };
  teacher.name = data.name;
  teacher.email = data.email;
  teacher.phone = data.phone;
  teacher.address = data.address;
  teacher.img = data.img || teacher.img;
  teacher.bloodType = data.bloodType;
  teacher.sex = data.sex;
  teacher.birthday = data.birthday;
  teacher.subjectIds = data.subjectIds ?? [];

  revalidatePath("/list/teachers");
  return { success: true, error: false };
}

export async function deleteTeacher(id: number): Promise<ActionResult> {
  const denied = requireRole(["admin"]);
  if (denied) return denied;

  const index = teachersData.findIndex((t) => t.id === id);
  if (index !== -1) teachersData.splice(index, 1);
  classesData.forEach((c) => {
    if (c.supervisorId === id) c.supervisorId = null;
  });

  revalidatePath("/list/teachers");
  return { success: true, error: false };
}

// ---- Student -------------------------------------------------------------

export async function createStudent(data: StudentSchema): Promise<ActionResult> {
  const denied = requireRole(["admin"]);
  if (denied) return denied;

  studentsData.push({
    id: nextId(studentsData),
    name: data.name,
    email: data.email,
    phone: data.phone,
    address: data.address,
    img: data.img || "/avatar.png",
    bloodType: data.bloodType,
    sex: data.sex,
    birthday: data.birthday,
    parentId: data.parentId,
    classId: data.classId,
    gradeId: data.gradeId,
  });
  revalidatePath("/list/students");
  return { success: true, error: false };
}

export async function updateStudent(data: StudentSchema): Promise<ActionResult> {
  const denied = requireRole(["admin"]);
  if (denied) return denied;

  const student = studentsData.find((s) => s.id === data.id);
  if (!student) return { success: false, error: true, message: "Student not found." };
  student.name = data.name;
  student.email = data.email;
  student.phone = data.phone;
  student.address = data.address;
  student.img = data.img || student.img;
  student.bloodType = data.bloodType;
  student.sex = data.sex;
  student.birthday = data.birthday;
  student.parentId = data.parentId;
  student.classId = data.classId;
  student.gradeId = data.gradeId;

  revalidatePath("/list/students");
  return { success: true, error: false };
}

export async function deleteStudent(id: number): Promise<ActionResult> {
  const denied = requireRole(["admin"]);
  if (denied) return denied;

  const index = studentsData.findIndex((s) => s.id === id);
  if (index !== -1) studentsData.splice(index, 1);

  revalidatePath("/list/students");
  return { success: true, error: false };
}

// ---- Lesson ----------------------------------------------------------------

export async function createLesson(data: LessonSchema): Promise<ActionResult> {
  const denied = requireRole(["admin", "teacher"]);
  if (denied) return denied;

  lessonsData.push({
    id: nextId(lessonsData),
    name: data.name,
    day: data.day,
    startTime: data.startTime,
    endTime: data.endTime,
    subjectId: data.subjectId,
    classId: data.classId,
    teacherId: data.teacherId,
  });
  revalidatePath("/list/lessons");
  return { success: true, error: false };
}

export async function updateLesson(data: LessonSchema): Promise<ActionResult> {
  const denied = requireRole(["admin", "teacher"]);
  if (denied) return denied;

  const lesson = lessonsData.find((l) => l.id === data.id);
  if (!lesson) return { success: false, error: true, message: "Lesson not found." };
  lesson.name = data.name;
  lesson.day = data.day;
  lesson.startTime = data.startTime;
  lesson.endTime = data.endTime;
  lesson.subjectId = data.subjectId;
  lesson.classId = data.classId;
  lesson.teacherId = data.teacherId;

  revalidatePath("/list/lessons");
  return { success: true, error: false };
}

export async function deleteLesson(id: number): Promise<ActionResult> {
  const denied = requireRole(["admin", "teacher"]);
  if (denied) return denied;

  const index = lessonsData.findIndex((l) => l.id === id);
  if (index !== -1) lessonsData.splice(index, 1);

  revalidatePath("/list/lessons");
  return { success: true, error: false };
}

// ---- Exam ------------------------------------------------------------------

export async function createExam(data: ExamSchema): Promise<ActionResult> {
  const denied = requireRole(["admin", "teacher"]);
  if (denied) return denied;

  examsData.push({
    id: nextId(examsData),
    title: data.title,
    startTime: data.startTime,
    endTime: data.endTime,
    lessonId: data.lessonId,
  });
  revalidatePath("/list/exams");
  return { success: true, error: false };
}

export async function updateExam(data: ExamSchema): Promise<ActionResult> {
  const denied = requireRole(["admin", "teacher"]);
  if (denied) return denied;

  const exam = examsData.find((e) => e.id === data.id);
  if (!exam) return { success: false, error: true, message: "Exam not found." };
  exam.title = data.title;
  exam.startTime = data.startTime;
  exam.endTime = data.endTime;
  exam.lessonId = data.lessonId;

  revalidatePath("/list/exams");
  return { success: true, error: false };
}

export async function deleteExam(id: number): Promise<ActionResult> {
  const denied = requireRole(["admin", "teacher"]);
  if (denied) return denied;

  const index = examsData.findIndex((e) => e.id === id);
  if (index !== -1) examsData.splice(index, 1);

  revalidatePath("/list/exams");
  return { success: true, error: false };
}

// ---- Assignment --------------------------------------------------------------

export async function createAssignment(data: AssignmentSchema): Promise<ActionResult> {
  const denied = requireRole(["admin", "teacher"]);
  if (denied) return denied;

  assignmentsData.push({
    id: nextId(assignmentsData),
    title: data.title,
    startDate: data.startDate,
    dueDate: data.dueDate,
    lessonId: data.lessonId,
  });
  revalidatePath("/list/assignments");
  return { success: true, error: false };
}

export async function updateAssignment(data: AssignmentSchema): Promise<ActionResult> {
  const denied = requireRole(["admin", "teacher"]);
  if (denied) return denied;

  const assignment = assignmentsData.find((a) => a.id === data.id);
  if (!assignment) return { success: false, error: true, message: "Assignment not found." };
  assignment.title = data.title;
  assignment.startDate = data.startDate;
  assignment.dueDate = data.dueDate;
  assignment.lessonId = data.lessonId;

  revalidatePath("/list/assignments");
  return { success: true, error: false };
}

export async function deleteAssignment(id: number): Promise<ActionResult> {
  const denied = requireRole(["admin", "teacher"]);
  if (denied) return denied;

  const index = assignmentsData.findIndex((a) => a.id === id);
  if (index !== -1) assignmentsData.splice(index, 1);

  revalidatePath("/list/assignments");
  return { success: true, error: false };
}

// ---- Event -------------------------------------------------------------------

export async function createEvent(data: EventSchema): Promise<ActionResult> {
  const denied = requireRole(["admin", "teacher"]);
  if (denied) return denied;

  eventsData.push({
    id: nextId(eventsData),
    title: data.title,
    description: data.description,
    startTime: data.startTime,
    endTime: data.endTime,
    classId: toIdOrNull(data.classId),
  });
  revalidatePath("/list/events");
  return { success: true, error: false };
}

export async function updateEvent(data: EventSchema): Promise<ActionResult> {
  const denied = requireRole(["admin", "teacher"]);
  if (denied) return denied;

  const event = eventsData.find((e) => e.id === data.id);
  if (!event) return { success: false, error: true, message: "Event not found." };
  event.title = data.title;
  event.description = data.description;
  event.startTime = data.startTime;
  event.endTime = data.endTime;
  event.classId = toIdOrNull(data.classId);

  revalidatePath("/list/events");
  return { success: true, error: false };
}

export async function deleteEvent(id: number): Promise<ActionResult> {
  const denied = requireRole(["admin", "teacher"]);
  if (denied) return denied;

  const index = eventsData.findIndex((e) => e.id === id);
  if (index !== -1) eventsData.splice(index, 1);

  revalidatePath("/list/events");
  return { success: true, error: false };
}

// ---- Announcement --------------------------------------------------------------

export async function createAnnouncement(data: AnnouncementSchema): Promise<ActionResult> {
  const denied = requireRole(["admin", "teacher"]);
  if (denied) return denied;

  announcementsData.push({
    id: nextId(announcementsData),
    title: data.title,
    description: data.description,
    date: data.date,
    classId: toIdOrNull(data.classId),
  });
  revalidatePath("/list/announcements");
  return { success: true, error: false };
}

export async function updateAnnouncement(data: AnnouncementSchema): Promise<ActionResult> {
  const denied = requireRole(["admin", "teacher"]);
  if (denied) return denied;

  const announcement = announcementsData.find((a) => a.id === data.id);
  if (!announcement) return { success: false, error: true, message: "Announcement not found." };
  announcement.title = data.title;
  announcement.description = data.description;
  announcement.date = data.date;
  announcement.classId = toIdOrNull(data.classId);

  revalidatePath("/list/announcements");
  return { success: true, error: false };
}

export async function deleteAnnouncement(id: number): Promise<ActionResult> {
  const denied = requireRole(["admin", "teacher"]);
  if (denied) return denied;

  const index = announcementsData.findIndex((a) => a.id === id);
  if (index !== -1) announcementsData.splice(index, 1);

  revalidatePath("/list/announcements");
  return { success: true, error: false };
}
