import { useEffect, useState } from "react";
import propertyServices from "../../infrastructure/propertyServices";
import { where } from "firebase/firestore";
import { Property } from "../../domain/property";
import PropertyCard from "./components/propertyCard";
import { Flex } from "antd";

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
    return <div>Loading</div>;
  }

  const duplicateProperties = Array.from({ length: 12 }, (_, index) => ({
    ...properties[0],
  }));

  return (
    <div>
      <Flex wrap="wrap" gap={"large"} align="center" justify="center">
        {[...duplicateProperties, ...properties]?.map((property) => (
          <PropertyCard property={property} />
        ))}
      </Flex>
    </div>
  );
};

export default PropertyListPage;
