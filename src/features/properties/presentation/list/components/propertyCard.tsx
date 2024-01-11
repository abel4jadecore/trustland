import { storage } from "@/features/core/domain/utils/firebase";
import useAuth from "@/features/core/presentation/hooks/useAuth";
import { Property } from "@/features/properties/domain/property";
import { Card } from "antd";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const PropertyCard = ({ property }: { property: Property }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [coverUrl, setCoverUrl] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const url = `users/${user?.id}/${property.id}/pictures`;
      const listRef = ref(storage, url);
      const response = await listAll(listRef);
      const imageUrl = await getDownloadURL(
        ref(storage, response.items[0].fullPath)
      );
      setCoverUrl(imageUrl);
    };
    getData();
  });

  return (
    <Card
      hoverable
      size="default"
      style={{ width: "360px" }}
      onClick={() => {
        navigate(`/properties/${property.id}/edit`);
      }}
      cover={<img alt="example" src={coverUrl} />}
    >
      <Meta
        title={property.title}
        description={`In ${property.address.district}`}
      />
    </Card>
  );
};

export default PropertyCard;
