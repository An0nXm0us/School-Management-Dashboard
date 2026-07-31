"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import InputField from "../InputField";
import { eventSchema, EventSchema } from "@/lib/formValidationSchemas";
import { createEvent, updateEvent } from "@/lib/actions";

const toLocalInput = (d?: Date | string) => {
  if (!d) return undefined;
  const date = new Date(d);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};

const EventForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: EventSchema;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: { classes: { id: number; name: string }[] };
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventSchema>({
    resolver: zodResolver(eventSchema) as Resolver<EventSchema>,
    defaultValues: data,
  });
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (formData) => {
    setSubmitError(null);
    const res = type === "create" ? await createEvent(formData) : await updateEvent(formData);
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
        {type === "create" ? "Create a new event" : "Update event"}
      </h1>
      <div className="flex flex-wrap gap-4">
        <InputField label="Title" name="title" register={register} error={errors.title} defaultValue={data?.title} />
        <InputField label="Description" name="description" register={register} error={errors.description} defaultValue={data?.description} />
        <InputField
          label="Start time"
          name="startTime"
          type="datetime-local"
          register={register}
          error={errors.startTime as any}
          defaultValue={toLocalInput(data?.startTime)}
        />
        <InputField
          label="End time"
          name="endTime"
          type="datetime-local"
          register={register}
          error={errors.endTime as any}
          defaultValue={toLocalInput(data?.endTime)}
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

export default EventForm;
