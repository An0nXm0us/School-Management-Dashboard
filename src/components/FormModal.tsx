"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ComponentType, useState } from "react";
import {
  deleteAnnouncement,
  deleteAssignment,
  deleteClass,
  deleteEvent,
  deleteExam,
  deleteLesson,
  deleteParent,
  deleteStudent,
  deleteSubject,
  deleteTeacher,
} from "@/lib/actions";

const loading = () => <h1 className="text-sm text-gray-400">Loading form...</h1>;

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), { loading });
const StudentForm = dynamic(() => import("./forms/StudentForm"), { loading });
const ParentForm = dynamic(() => import("./forms/ParentForm"), { loading });
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), { loading });
const ClassForm = dynamic(() => import("./forms/ClassForm"), { loading });
const LessonForm = dynamic(() => import("./forms/LessonForm"), { loading });
const ExamForm = dynamic(() => import("./forms/ExamForm"), { loading });
const AssignmentForm = dynamic(() => import("./forms/AssignmentForm"), { loading });
const EventForm = dynamic(() => import("./forms/EventForm"), { loading });
const AnnouncementForm = dynamic(() => import("./forms/AnnouncementForm"), { loading });

export type FormTable =
  | "teacher"
  | "student"
  | "parent"
  | "subject"
  | "class"
  | "lesson"
  | "exam"
  | "assignment"
  | "event"
  | "announcement";

export type FormContainerProps = {
  table: FormTable;
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
  relatedData?: any;
};

const forms: Record<FormTable, ComponentType<any>> = {
  teacher: TeacherForm,
  student: StudentForm,
  parent: ParentForm,
  subject: SubjectForm,
  class: ClassForm,
  lesson: LessonForm,
  exam: ExamForm,
  assignment: AssignmentForm,
  event: EventForm,
  announcement: AnnouncementForm,
};

const deleteActions: Record<FormTable, (id: number) => Promise<{ success: boolean; error: boolean; message?: string }>> = {
  teacher: deleteTeacher,
  student: deleteStudent,
  parent: deleteParent,
  subject: deleteSubject,
  class: deleteClass,
  lesson: deleteLesson,
  exam: deleteExam,
  assignment: deleteAssignment,
  event: deleteEvent,
  announcement: deleteAnnouncement,
};

const FormModal = ({ table, type, data, id, relatedData }: FormContainerProps) => {
  const [open, setOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const router = useRouter();

  const icon = type === "create" ? "plus" : type === "update" ? "edit" : "delete";
  const bgColor =
    type === "create" ? "bg-Blue" : type === "update" ? "bg-darkerYellow" : "bg-red-100";

  const Form = forms[table];

  const handleDelete = async () => {
    if (!id) return;
    setDeleteError(null);
    const res = await deleteActions[table](id);
    if (res.success) {
      router.refresh();
      setOpen(false);
    } else {
      setDeleteError(res.message ?? "Something went wrong.");
    }
  };

  return (
    <>
      <button
        type="button"
        className={`w-7 h-7 flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${icon}.png`} alt={type} width={14} height={14} />
      </button>
      {open && (
        <div className="w-screen h-screen fixed left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] max-h-[90vh] overflow-y-auto">
            {type === "delete" && id ? (
              <div className="flex flex-col gap-4">
                <span className="text-center font-medium">
                  All related data will be lost. Are you sure you want to delete this {table}?
                </span>
                {deleteError && <p className="text-center text-sm text-red-500">{deleteError}</p>}
                <button
                  onClick={handleDelete}
                  className="w-max self-center bg-red-600 text-white py-2 px-4 rounded-md"
                >
                  Delete
                </button>
              </div>
            ) : Form ? (
              <Form type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
            ) : (
              "Form not found"
            )}
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="close" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
