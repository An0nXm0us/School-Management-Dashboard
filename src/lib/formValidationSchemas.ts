import { z } from "zod";

export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, "Subject name is required"),
});
export type SubjectSchema = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, "Class name is required"),
  capacity: z.coerce.number().min(1, "Capacity must be at least 1"),
  gradeId: z.coerce.number().min(1, "Grade is required"),
  supervisorId: z.coerce.number().optional(),
});
export type ClassSchema = z.infer<typeof classSchema>;

export const parentSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
});
export type ParentSchema = z.infer<typeof parentSchema>;

export const teacherSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  img: z.string().optional(),
  bloodType: z.string().min(1, "Blood type is required"),
  sex: z.enum(["MALE", "FEMALE"]),
  birthday: z.string().min(1, "Birthday is required"),
  subjectIds: z.array(z.coerce.number()).optional(),
});
export type TeacherSchema = z.infer<typeof teacherSchema>;

export const studentSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  img: z.string().optional(),
  bloodType: z.string().min(1, "Blood type is required"),
  sex: z.enum(["MALE", "FEMALE"]),
  birthday: z.string().min(1, "Birthday is required"),
  parentId: z.coerce.number().min(1, "Parent is required"),
  classId: z.coerce.number().min(1, "Class is required"),
  gradeId: z.coerce.number().min(1, "Grade is required"),
});
export type StudentSchema = z.infer<typeof studentSchema>;

export const lessonSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, "Lesson name is required"),
  day: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  subjectId: z.coerce.number().min(1, "Subject is required"),
  classId: z.coerce.number().min(1, "Class is required"),
  teacherId: z.coerce.number().min(1, "Teacher is required"),
});
export type LessonSchema = z.infer<typeof lessonSchema>;

export const examSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, "Title is required"),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  lessonId: z.coerce.number().min(1, "Lesson is required"),
});
export type ExamSchema = z.infer<typeof examSchema>;

export const assignmentSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, "Title is required"),
  startDate: z.coerce.date(),
  dueDate: z.coerce.date(),
  lessonId: z.coerce.number().min(1, "Lesson is required"),
});
export type AssignmentSchema = z.infer<typeof assignmentSchema>;

export const eventSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  classId: z.coerce.number().optional(),
});
export type EventSchema = z.infer<typeof eventSchema>;

export const announcementSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.coerce.date(),
  classId: z.coerce.number().optional(),
});
export type AnnouncementSchema = z.infer<typeof announcementSchema>;
