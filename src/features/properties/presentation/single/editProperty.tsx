import { useEffect, useState } from "react";
import PropertyForm from "./components/propertyForm";
import { Property } from "../../domain/property";
import propertyServices from "../../infrastructure/propertyServices";
import useAuth from "@/features/core/presentation/hooks/useAuth";
import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const EditProperty = ({ id }: { id: string }) => {
  const { user } = useAuth();
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
    return (
      <Flex justify="center" align="center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 120 }} spin />} />
      </Flex>
    );
  }

  if (typeof property === "undefined") {
    return <div>no property in the id</div>;
  }

  return (
    <>
      <PropertyForm initialValues={property} />
    </>
  );
};

export default EditProperty;
