"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, Resolver, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import InputField from "../InputField";
import { teacherSchema, TeacherSchema } from "@/lib/formValidationSchemas";
import { createTeacher, updateTeacher } from "@/lib/actions";

const TeacherForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: TeacherSchema;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: { subjects: { id: number; name: string }[] };
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TeacherSchema>({
    resolver: zodResolver(teacherSchema) as Resolver<TeacherSchema>,
    defaultValues: data,
  });
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (formData) => {
    setSubmitError(null);
    const res = type === "create" ? await createTeacher(formData) : await updateTeacher(formData);
    if (res.success) {
      router.refresh();
      setOpen(false);
    } else {
      setSubmitError(res.message ?? "Something went wrong.");
    }
  });

  const { subjects = [] } = relatedData ?? {};

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new teacher" : "Update teacher"}
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
          <label className="text-xs text-muted-foreground">Subjects</label>
          <Controller
            name="subjectIds"
            control={control}
            defaultValue={data?.subjectIds ?? []}
            render={({ field }) => (
              <select
                multiple
                className="ring-1 ring-border bg-background text-foreground p-2 rounded-md text-sm w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring h-[100px]"
                value={(field.value ?? []).map(String)}
                onChange={(e) =>
                  field.onChange(Array.from(e.target.selectedOptions, (o) => Number(o.value)))
                }
              >
                {subjects.map((s) => (
                  <option value={s.id} key={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            )}
          />
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

export default TeacherForm;
