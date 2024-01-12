import useAuth from "@/features/core/presentation/hooks/useAuth";
import { Property } from "@/features/properties/domain/property";
import propertyServices from "@/features/properties/infrastructure/propertyServices";
import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  Select,
  Space,
  UploadFile,
} from "antd";
import { RcFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyAttachments from "./propertyAttachments";
import { statesAndDistricts } from "./statesAndDistricts";

const { TextArea } = Input;

const PropertyForm = ({ initialValues }: { initialValues?: Property }) => {
  type FieldType = Property;

  const [form] = Form.useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { deleteProperty, uploadAttachment } = propertyServices;
  const id = initialValues?.id ?? "";

  const stateValue = Form.useWatch(["address", "state"], form);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [localFileList, setLocalFileList] = useState<RcFile[]>([]);

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

  const handleUpload = async (propertyId: string) => {
    const promises = localFileList.map(async (file) => {
      await uploadAttachment(
        {
          localFile: file,
          setFileList: setFileList,
        },
        { userId: user?.id ?? "", propertyId: propertyId }
      );
    });
    await Promise.all(promises);
    setLocalFileList([]);
  };

  const onFinish = async (values: Property): Promise<void> => {
    const detailResponse = await propertyServices.saveProperty({
      ...values,
      id: id,
    });
    console.log("Yeah");
    await handleUpload(detailResponse.id);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div style={{ maxWidth: "1028px", margin: "auto" }}>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: "60%" }}
        initialValues={initialValues}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Space direction="vertical">
          <Card title="Property details ">
            <Form.Item<FieldType>
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input your area!" }]}
            >
              <Input type="string" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Area"
              name="area"
              rules={[{ required: true, message: "Please input your area!" }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Unit of Measure"
              name="areaUOM"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={filterOption}
                options={[
                  {
                    value: "acre",
                    label: "Acre",
                  },
                  {
                    value: "sqft",
                    label: "Sqft",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="Dimensions"
              name="dimension"
              rules={[{ required: true, message: "Please input your area!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please input your area!" }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item<FieldType>
              label="Ownership"
              name="ownership"
              rules={[{ required: true, message: "Please input your area!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Plot No"
              name={["address", "plotNo"]}
              rules={[{ required: true, message: "Please input your area!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Address Line 1"
              name={["address", "addressOne"]}
              rules={[{ required: true, message: "Please input your area!" }]}
            >
              <TextArea rows={2} />
            </Form.Item>
            <Form.Item<FieldType>
              label="Address Line 2"
              name={["address", "addressTwo"]}
              rules={[{ required: true, message: "Please input your area!" }]}
            >
              <TextArea rows={2} />
            </Form.Item>
            <Form.Item<FieldType>
              label="State"
              name={["address", "state"]}
              rules={[{ required: true, message: "Please input your area!" }]}
            >
              <Select
                showSearch
                // placeholder="Select a state"
                optionFilterProp="children"
                filterOption={filterOption}
                options={statesAndDistricts.states.map((state) => ({
                  value: state.state,
                  label: state.state,
                }))}
              />
            </Form.Item>
            <Form.Item<FieldType>
              label="District"
              name={["address", "district"]}
              rules={[{ required: true, message: "Please input your area!" }]}
            >
              <Select
                showSearch
                // placeholder="Select a district"
                optionFilterProp="children"
                filterOption={filterOption}
                options={statesAndDistricts.states
                  .find((state) => state.state == stateValue)
                  ?.districts.map((district) => ({
                    value: district,
                    label: district,
                  }))}
              />
            </Form.Item>
            <Form.Item<FieldType>
              label="Pincode"
              name={["address", "pincode"]}
              rules={[{ required: true, message: "Please input your area!" }]}
            >
              <TextArea rows={2} />
            </Form.Item>

            <Form.Item<FieldType>
              label="Open sides"
              name="openSides"
              rules={[{ required: true, message: "Please input your area!" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item<FieldType>
              label="Approach road width"
              name="approachRoadWidth"
              rules={[{ required: true, message: "Please input your area!" }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Type"
              name="propertyType"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={filterOption}
                options={[
                  {
                    value: "farm",
                    label: "Farm",
                  },
                  {
                    value: "residential",
                    label: "Residential",
                  },
                  {
                    value: "commercial",
                    label: "Commercial",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item<FieldType>
              label="List Type"
              name="listType"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={filterOption}
                options={[
                  {
                    value: "sale",
                    label: "Sale",
                  },
                  {
                    value: "auction",
                    label: "Auction",
                  },
                  {
                    value: "hold",
                    label: "Hold",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item<FieldType>
              label="Contact name"
              name="contactName"
              rules={[{ required: true, message: "Please input your area!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Contact no"
              name="contactNo"
              rules={[{ required: true, message: "Please input your area!" }]}
            >
              <Input />
            </Form.Item>
          </Card>

          <PropertyAttachments
            id={id}
            localFileList={localFileList}
            setLocalFileList={setLocalFileList}
            fileList={fileList}
            setFileList={setFileList}
          />

          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <Flex justify="end" gap={12}>
              <Button
                type="primary"
                danger
                htmlType="submit"
                onClick={async () => {
                  try {
                    await deleteProperty(id);
                    navigate("/properties");
                  } catch (err) {
                    console.log();
                  }
                }}
              >
                Delete
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Flex>
          </Form.Item>
        </Space>
      </Form>
    </div>
  );
};

export default PropertyForm;
