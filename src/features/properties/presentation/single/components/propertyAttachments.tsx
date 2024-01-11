import { Button, Card, Upload, message, Modal } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import { useEffect, useState } from "react";
import propertyServices from "@/features/properties/infrastructure/propertyServices";
import useAuth from "@/features/core/presentation/hooks/useAuth";
import { Property } from "@/features/properties/domain/property";

const { Dragger } = Upload;

const PropertyAttachments = ({
  initialValues,
}: {
  initialValues: Property;
}) => {
  const { uploadAttachment } = propertyServices;
  const { user } = useAuth();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [localFiles, setLocalFiles] = useState<RcFile[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await propertyServices.listAllFiles({
        userId: user?.id ?? "",
        propertyId: initialValues.id,
      });
      setFileList(response);
    };
    getData();
  }, [user?.id, initialValues.id]);

  const handleUpload = async () => {
    await uploadAttachment(
      localFiles[0],
      {
        userId: user?.id ?? "",
        propertyId: initialValues.id,
      },
      setFileList
    );
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = file.url;
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const props: UploadProps = {
    name: "file",
    fileList,
    multiple: true,
    listType: "picture-card",
    onPreview: handlePreview,
    beforeUpload: (file) => {
      setLocalFiles([...localFiles, file]);

      return false;
    },
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <Card title={"Attachments"}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </Card>
      <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default PropertyAttachments;
