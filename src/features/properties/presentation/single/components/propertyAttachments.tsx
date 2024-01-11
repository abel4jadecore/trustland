import { Button, Card, Upload, message, Modal } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import { useEffect, useState } from "react";
import propertyServices from "@/features/properties/infrastructure/propertyServices";
import useAuth from "@/features/core/presentation/hooks/useAuth";

const { Dragger } = Upload;

const PropertyAttachments = ({ id }: { id: string }) => {
  const { uploadAttachment } = propertyServices;
  const { user } = useAuth();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const localFiles: RcFile[] = [];
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await propertyServices.listAllFiles({
        userId: user?.id ?? "",
        propertyId: id,
      });
      setFileList(response);
    };
    getData();
  }, [user?.id, id]);

  const handleUpload = async () => {
    const promises = localFiles.map(async (file) => {
      await uploadAttachment(
        {
          localFile: file,
          fileList: fileList,
          setFileList: setFileList,
        },
        { userId: user?.id ?? "", propertyId: id }
      );
    });
    Promise.all(promises);
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = file.url;
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const props: UploadProps = {
    name: "file",
    fileList,
    multiple: true,
    listType: "picture-card",
    onPreview: handlePreview,
    beforeUpload: (file) => {
      localFiles.push(file);

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
