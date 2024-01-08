import { Property } from "@/features/properties/domain/property";
import { Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Meta } = Card;

const PropertyCard = ({ property }: { property: Property }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      size="default"
      style={{ width: "360px" }}
      onClick={() => {
        navigate(`/properties/${property.id}/edit`);
      }}
    >
      <Meta
        title={property.title}
        description={`In ${property.address.district}`}
      />
    </Card>
  );
};

export default PropertyCard;
