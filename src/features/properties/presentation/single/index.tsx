import { useParams } from "react-router-dom";
import NewProperty from "./newProperty";
import PropertyDetail from "./propertyDetail";

const SinglePropertyPage = () => {
  const params = useParams();
  const isNew = params.id === "new";

  if (isNew) {
    return <NewProperty />;
  }

  const id = params.id!;

  return <PropertyDetail id={id} />;
};

export default SinglePropertyPage;
