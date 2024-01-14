import { Button, Card, Upload, message, Modal } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import propertyServices from "@/features/properties/infrastructure/propertyServices";
import useAuth from "@/features/core/presentation/hooks/useAuth";

const { Dragger } = Upload;

const PropertyAttachments = ({
  id,
  localFileList,
  setLocalFileList,
  fileList,
  setFileList,
}: {
  id: string;
  localFileList: RcFile[];
  setLocalFileList: Dispatch<SetStateAction<RcFile[]>>;
  fileList: UploadFile[];
  setFileList: Dispatch<SetStateAction<UploadFile[]>>;
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

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
    fileList: fileList.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    ),
    multiple: true,
    listType: "picture-card",
    onPreview: handlePreview,
    beforeUpload: (file, fileListOne) => {
      setLocalFileList((prevFileList) => [...prevFileList, file]);

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
    </div>
  );
};

export default PropertyAttachments;
