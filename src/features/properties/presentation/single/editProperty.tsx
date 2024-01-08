import { useEffect, useState } from "react";
import PropertyForm from "./components/propertyForm";
import { Property } from "../../domain/property";
import propertyServices from "../../infrastructure/propertyServices";

const EditProperty = ({ id }: { id: string }) => {
  const [property, setProperty] = useState<Property | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      const response = await propertyServices.getProperty(id);
      setProperty(response);
      setIsLoading(false);
    };

    getData();
  }, [id]);

  if (isLoading) {
    return <div>property loadings</div>;
  }

  if (typeof property === "undefined") {
    return <div>no property in the id</div>;
  }

  return <PropertyForm initialValues={property} />;
};

export default EditProperty;
