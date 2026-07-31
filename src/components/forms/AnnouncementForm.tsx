"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import InputField from "../InputField";
import { announcementSchema, AnnouncementSchema } from "@/lib/formValidationSchemas";
import { createAnnouncement, updateAnnouncement } from "@/lib/actions";

const toDateInput = (d?: Date | string) => (d ? new Date(d).toISOString().slice(0, 10) : undefined);

const AnnouncementForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: AnnouncementSchema;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: { classes: { id: number; name: string }[] };
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AnnouncementSchema>({
    resolver: zodResolver(announcementSchema) as Resolver<AnnouncementSchema>,
    defaultValues: data,
  });
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (formData) => {
    setSubmitError(null);
    const res =
      type === "create" ? await createAnnouncement(formData) : await updateAnnouncement(formData);
    if (res.success) {
      router.refresh();
      setOpen(false);
    } else {
      setSubmitError(res.message ?? "Something went wrong.");
    }
  });

  const { classes = [] } = relatedData ?? {};

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new announcement" : "Update announcement"}
      </h1>
      <div className="flex flex-wrap gap-4">
        <InputField label="Title" name="title" register={register} error={errors.title} defaultValue={data?.title} />
        <InputField label="Description" name="description" register={register} error={errors.description} defaultValue={data?.description} />
        <InputField
          label="Date"
          name="date"
          type="date"
          register={register}
          error={errors.date as any}
          defaultValue={toDateInput(data?.date)}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-muted-foreground">Class</label>
          <select
            className="ring-1 ring-border bg-background text-foreground p-2 rounded-md text-sm w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            {...register("classId")}
            defaultValue={data?.classId ?? ""}
          >
            <option value="">Whole school</option>
            {classes.map((c) => (
              <option value={c.id} key={c.id}>
                {c.name}
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

export default AnnouncementForm;
