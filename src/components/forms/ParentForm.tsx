"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import InputField from "../InputField";
import { parentSchema, ParentSchema } from "@/lib/formValidationSchemas";
import { createParent, updateParent } from "@/lib/actions";

const ParentForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: ParentSchema;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ParentSchema>({
    resolver: zodResolver(parentSchema) as Resolver<ParentSchema>,
    defaultValues: data,
  });
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (formData) => {
    setSubmitError(null);
    const res = type === "create" ? await createParent(formData) : await updateParent(formData);
    if (res.success) {
      router.refresh();
      setOpen(false);
    } else {
      setSubmitError(res.message ?? "Something went wrong.");
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new parent" : "Update parent"}
      </h1>
      <div className="flex flex-wrap gap-4">
        <InputField label="Full name" name="name" register={register} error={errors.name} defaultValue={data?.name} />
        <InputField label="Email" name="email" register={register} error={errors.email} defaultValue={data?.email} />
        <InputField label="Phone" name="phone" register={register} error={errors.phone} defaultValue={data?.phone} />
        <InputField label="Address" name="address" register={register} error={errors.address} defaultValue={data?.address} />
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

export default ParentForm;
