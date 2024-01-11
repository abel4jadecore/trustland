import { useFormik } from "formik";
import propertyServices from "../../infrastructure/propertyServices";
import { Property } from "../../domain/property";
import { Button, Checkbox, Form, Input } from "antd";
import PropertyForm from "./components/propertyForm";

const NewProperty = () => {
  return (
    <div>
      <PropertyForm />
    </div>
  );
};

export default NewProperty;
