import {
  classesData,
  gradesData,
  lessonsData,
  parentsData,
  studentsData,
  subjectsData,
  teachersData,
} from "@/lib/data";
import FormModal, { FormContainerProps } from "./FormModal";

// Server component: gathers the relational dropdown options each form needs
// (e.g. the list of subjects for the Teacher form), then hands off to the
// client-side FormModal that actually renders the dialog.
const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  let relatedData: any = {};

  if (type !== "delete") {
    switch (table) {
      case "class":
        relatedData = {
          grades: gradesData,
          teachers: teachersData.map((t) => ({ id: t.id, name: t.name })),
        };
        break;
      case "teacher":
        relatedData = { subjects: subjectsData };
        break;
      case "student":
        relatedData = {
          grades: gradesData,
          classes: classesData,
          parents: parentsData.map((p) => ({ id: p.id, name: p.name })),
        };
        break;
      case "lesson":
        relatedData = {
          subjects: subjectsData,
          classes: classesData,
          teachers: teachersData.map((t) => ({ id: t.id, name: t.name })),
        };
        break;
      case "exam":
      case "assignment":
        relatedData = { lessons: lessonsData };
        break;
      case "event":
      case "announcement":
        relatedData = { classes: classesData };
        break;
      default:
        break;
    }
  }

  return <FormModal table={table} type={type} data={data} id={id} relatedData={relatedData} />;
};

export default FormContainer;
