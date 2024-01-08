import { useFormik } from "formik";
import propertyServices from "../../infrastructure/propertyServices";
import { Property } from "../../domain/property";

const NewProperty = () => {
  const formik = useFormik({
    initialValues: {
      id: "",
      area: 0,
      areaUOM: "acre",
      dimension: "",
      ownership: "",
      openSides: 1,
      approachRoadWidth: 2,
      address: "",
      saleStatus: 123,
      coordinate: {
        latitude: 12,
        longitude: 12,
      },
      description: "",
      ownerId: "",
      docs: "",
      propertyType: "farm",
      listType: "sale",
      listedAt: new Date(),
      updatedAt: new Date(),
      pictures: "",
      valuation: "",
      contact: "",
    },
    onSubmit: async (values: Property) => {
      try {
        await propertyServices.saveProperty(values);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div>
      New
      <form onSubmit={formik.handleSubmit}>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewProperty;
