"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import InputField from "../InputField";
import { classSchema, ClassSchema } from "@/lib/formValidationSchemas";
import { createClass, updateClass } from "@/lib/actions";

const ClassForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: ClassSchema;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: {
    grades: { id: number; level: number }[];
    teachers: { id: number; name: string }[];
  };
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClassSchema>({
    resolver: zodResolver(classSchema) as Resolver<ClassSchema>,
    defaultValues: data,
  });
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (formData) => {
    setSubmitError(null);
    const res = type === "create" ? await createClass(formData) : await updateClass(formData);
    if (res.success) {
      router.refresh();
      setOpen(false);
    } else {
      setSubmitError(res.message ?? "Something went wrong.");
    }
  });

  const { grades = [], teachers = [] } = relatedData ?? {};

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new class" : "Update class"}
      </h1>
      <div className="flex flex-wrap gap-4">
        <InputField label="Class name" name="name" register={register} error={errors.name} defaultValue={data?.name} />
        <InputField
          label="Capacity"
          name="capacity"
          type="number"
          register={register}
          error={errors.capacity}
          defaultValue={data?.capacity}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-muted-foreground">Grade</label>
          <select
            className="ring-1 ring-border bg-background text-foreground p-2 rounded-md text-sm w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            {...register("gradeId")}
            defaultValue={data?.gradeId}
          >
            {grades.map((g) => (
              <option value={g.id} key={g.id}>
                Grade {g.level}
              </option>
            ))}
          </select>
          {errors.gradeId?.message && (
            <p className="text-xs text-danger">{errors.gradeId.message.toString()}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-muted-foreground">Supervisor</label>
          <select
            className="ring-1 ring-border bg-background text-foreground p-2 rounded-md text-sm w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            {...register("supervisorId")}
            defaultValue={data?.supervisorId ?? ""}
          >
            <option value="">None</option>
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

export default ClassForm;
