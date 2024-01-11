import { useEffect, useState } from "react";
import propertyServices from "../../infrastructure/propertyServices";
import { Property } from "../../domain/property";
import { Descriptions, DescriptionsProps, Button } from "antd";
import { useNavigate } from "react-router-dom";

const ViewProperty = ({ id }: { id: string }) => {
  const navigate = useNavigate();

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

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Title",
      children: property.title,
      span: 2,
    },
    {
      key: "2",
      label: "Area",
      children: `${property.area} ${property.areaUOM}`,
      span: 2,
    },
    {
      key: "3",
      label: "Approach Road Width",
      children: property.approachRoadWidth,
    },
    {
      key: "4",
      label: "Dimension",
      children: property.dimension,
    },
    {
      key: "5",
      label: "List Type",
      children: property.listType,
      span: 1,
    },
    {
      key: "6",
      label: "Open Sides",
      children: property.openSides,
      span: 1,
    },
    {
      key: "7",
      label: "Ownership",
      children: property.ownership,
    },
    {
      key: "8",
      label: "Description",
      children: property.description,
    },
    {
      key: "9",
      label: "Address",
      span: 3,
      children: (
        <>
          Plot no: ${property.address.plotNo}
          <br />
          Address one: {property.address.addressOne},
          <br />
          Address two: {property.address.addressTwo}
          <br />
          District: {property.address.district}
          <br />
          State: {property.address.state}
          <br />
          Pincode: {property.address.pincode}
          <br />
        </>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: "1028px", margin: "auto" }}>
      <Descriptions
        title="Property Info"
        items={items}
        bordered
        extra={
          <Button
            type="primary"
            onClick={() => {
              navigate(`/properties/${property.id}/edit`);
            }}
          >
            Edit
          </Button>
        }
      />
    </div>
  );
};

export default ViewProperty;
