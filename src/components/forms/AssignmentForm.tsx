"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import InputField from "../InputField";
import { assignmentSchema, AssignmentSchema } from "@/lib/formValidationSchemas";
import { createAssignment, updateAssignment } from "@/lib/actions";

const toDateInput = (d?: Date | string) => (d ? new Date(d).toISOString().slice(0, 10) : undefined);

const AssignmentForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: AssignmentSchema;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: { lessons: { id: number; name: string }[] };
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AssignmentSchema>({
    resolver: zodResolver(assignmentSchema) as Resolver<AssignmentSchema>,
    defaultValues: data,
  });
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (formData) => {
    setSubmitError(null);
    const res =
      type === "create" ? await createAssignment(formData) : await updateAssignment(formData);
    if (res.success) {
      router.refresh();
      setOpen(false);
    } else {
      setSubmitError(res.message ?? "Something went wrong.");
    }
  });

  const { lessons = [] } = relatedData ?? {};

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new assignment" : "Update assignment"}
      </h1>
      <div className="flex flex-wrap gap-4">
        <InputField label="Title" name="title" register={register} error={errors.title} defaultValue={data?.title} />
        <InputField
          label="Start date"
          name="startDate"
          type="date"
          register={register}
          error={errors.startDate as any}
          defaultValue={toDateInput(data?.startDate)}
        />
        <InputField
          label="Due date"
          name="dueDate"
          type="date"
          register={register}
          error={errors.dueDate as any}
          defaultValue={toDateInput(data?.dueDate)}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-muted-foreground">Lesson</label>
          <select
            className="ring-1 ring-border bg-background text-foreground p-2 rounded-md text-sm w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            {...register("lessonId")}
            defaultValue={data?.lessonId}
          >
            {lessons.map((l) => (
              <option value={l.id} key={l.id}>
                {l.name}
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

export default AssignmentForm;
