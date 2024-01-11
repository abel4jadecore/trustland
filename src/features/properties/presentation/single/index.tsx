import { useParams } from "react-router-dom";
import NewProperty from "./newProperty";
import { PAGE_MODE, PageMode } from "@/features/core/domain/pageMode";
import ViewProperty from "./viewProperty";
import EditProperty from "./editProperty";

const PropertyPage = () => {
  const params = useParams();
  const pageMode: PageMode =
    params.id === "new"
      ? PAGE_MODE.new
      : location.pathname.includes("edit")
      ? PAGE_MODE.edit
      : PAGE_MODE.view;

  if (pageMode === PAGE_MODE.new) {
    return <NewProperty />;
  }

  const id = params.id!;

  if (pageMode === PAGE_MODE.edit) {
    return <EditProperty id={id} />;
  }

  return <ViewProperty id={id} />;
};

export default PropertyPage;
