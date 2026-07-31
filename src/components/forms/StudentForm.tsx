"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import InputField from "../InputField";
import { studentSchema, StudentSchema } from "@/lib/formValidationSchemas";
import { createStudent, updateStudent } from "@/lib/actions";

const StudentForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: StudentSchema;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: {
    grades: { id: number; level: number }[];
    classes: { id: number; name: string; capacity: number; gradeId: number }[];
    parents: { id: number; name: string }[];
  };
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema) as Resolver<StudentSchema>,
    defaultValues: data,
  });
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (formData) => {
    setSubmitError(null);
    const res = type === "create" ? await createStudent(formData) : await updateStudent(formData);
    if (res.success) {
      router.refresh();
      setOpen(false);
    } else {
      setSubmitError(res.message ?? "Something went wrong.");
    }
  });

  const { grades = [], classes = [], parents = [] } = relatedData ?? {};

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new student" : "Update student"}
      </h1>
      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Personal Information</span>
      <div className="flex flex-wrap gap-4">
        <InputField label="Full name" name="name" register={register} error={errors.name} defaultValue={data?.name} />
        <InputField label="Email" name="email" register={register} error={errors.email} defaultValue={data?.email} />
        <InputField label="Phone" name="phone" register={register} error={errors.phone} defaultValue={data?.phone} />
        <InputField label="Address" name="address" register={register} error={errors.address} defaultValue={data?.address} />
        <InputField label="Photo URL" name="img" register={register} error={errors.img} defaultValue={data?.img} />
        <InputField label="Blood Type" name="bloodType" register={register} error={errors.bloodType} defaultValue={data?.bloodType} />
        <InputField
          label="Birthday"
          name="birthday"
          type="date"
          register={register}
          error={errors.birthday}
          defaultValue={data?.birthday}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-muted-foreground">Sex</label>
          <select
            className="ring-1 ring-border bg-background text-foreground p-2 rounded-md text-sm w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-muted-foreground">Parent</label>
          <select
            className="ring-1 ring-border bg-background text-foreground p-2 rounded-md text-sm w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            {...register("parentId")}
            defaultValue={data?.parentId}
          >
            {parents.map((p) => (
              <option value={p.id} key={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          {errors.parentId?.message && (
            <p className="text-xs text-danger">{errors.parentId.message.toString()}</p>
          )}
        </div>
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
                {c.name} ({c.capacity} seats)
              </option>
            ))}
          </select>
          {errors.classId?.message && (
            <p className="text-xs text-danger">{errors.classId.message.toString()}</p>
          )}
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

export default StudentForm;
