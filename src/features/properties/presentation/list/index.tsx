import { useEffect, useState } from "react";
import propertyServices from "../../infrastructure/propertyServices";
import { Property } from "../../domain/property";
import PropertyCard from "./components/propertyCard";
import { Flex } from "antd";
import Spinner from "@/features/core/presentation/components/spinner";

const PropertyListPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      const response = await propertyServices.getProperties();
      setProperties(response);
      setIsLoading(false);
    };

    getData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div style={{ maxWidth: "1280px", margin: "auto" }}>
      <Flex wrap="wrap" gap={"large"} align="center" justify="center">
        {properties?.map((property) => (
          <PropertyCard property={property} />
        ))}
      </Flex>
    </div>
  );
};

export default PropertyListPage;
