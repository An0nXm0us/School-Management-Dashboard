"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import InputField from "../InputField";
import { lessonSchema, LessonSchema } from "@/lib/formValidationSchemas";
import { createLesson, updateLesson } from "@/lib/actions";

const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"] as const;

const LessonForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: LessonSchema;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: {
    subjects: { id: number; name: string }[];
    classes: { id: number; name: string }[];
    teachers: { id: number; name: string }[];
  };
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LessonSchema>({
    resolver: zodResolver(lessonSchema) as Resolver<LessonSchema>,
    defaultValues: data,
  });
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (formData) => {
    setSubmitError(null);
    const res = type === "create" ? await createLesson(formData) : await updateLesson(formData);
    if (res.success) {
      router.refresh();
      setOpen(false);
    } else {
      setSubmitError(res.message ?? "Something went wrong.");
    }
  });

  const { subjects = [], classes = [], teachers = [] } = relatedData ?? {};

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new lesson" : "Update lesson"}
      </h1>
      <div className="flex flex-wrap gap-4">
        <InputField label="Lesson name" name="name" register={register} error={errors.name} defaultValue={data?.name} />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-muted-foreground">Day</label>
          <select
            className="ring-1 ring-border bg-background text-foreground p-2 rounded-md text-sm w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            {...register("day")}
            defaultValue={data?.day}
          >
            {DAYS.map((d) => (
              <option value={d} key={d}>
                {d.charAt(0) + d.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
        <InputField label="Start time" name="startTime" type="time" register={register} error={errors.startTime} defaultValue={data?.startTime} />
        <InputField label="End time" name="endTime" type="time" register={register} error={errors.endTime} defaultValue={data?.endTime} />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-muted-foreground">Subject</label>
          <select
            className="ring-1 ring-border bg-background text-foreground p-2 rounded-md text-sm w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            {...register("subjectId")}
            defaultValue={data?.subjectId}
          >
            {subjects.map((s) => (
              <option value={s.id} key={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-muted-foreground">Class</label>
          <select
            className="ring-1 ring-border bg-background text-foreground p-2 rounded-md text-sm w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            {...register("classId")}
            defaultValue={data?.classId}
          >
            {classes.map((c) => (
              <option value={c.id} key={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-muted-foreground">Teacher</label>
          <select
            className="ring-1 ring-border bg-background text-foreground p-2 rounded-md text-sm w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            {...register("teacherId")}
            defaultValue={data?.teacherId}
          >
            {teachers.map((t) => (
              <option value={t.id} key={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        {data?.id && (
          <InputField label="Id" name="id" register={register} defaultValue={data?.id} hidden />
        )}
      </div>
      {submitError && <span className="text-danger text-sm">{submitError}</span>}
      <button
        disabled={isSubmitting}
        className="bg-accent text-accent-foreground p-2 rounded-md hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Saving..." : type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default LessonForm;
