import { useFormik } from "formik";
import propertyServices from "../../infrastructure/propertyServices";
import { Property } from "../../domain/property";
import { Button, Checkbox, Form, Input } from "antd";
import PropertyForm from "./components/propertyForm";

const NewProperty = () => {
  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  function onFinish(values: unknown): void {
    throw new Error("Function not implemented.");
  }

  function onFinishFailed(errorInfo: unknown): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <PropertyForm initialValues={{}} />
    </div>
  );
};

export default NewProperty;
