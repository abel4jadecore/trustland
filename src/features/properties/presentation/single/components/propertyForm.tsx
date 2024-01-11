import { Property } from "@/features/properties/domain/property";
import propertyServices from "@/features/properties/infrastructure/propertyServices";
import { Button, Card, Form, Input, Select, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { statesAndDistricts } from "./statesAndDistricts";
import PropertyAttachments from "./propertyAttachments";

const { TextArea } = Input;

const PropertyForm = ({ initialValues }: { initialValues?: Property }) => {
  type FieldType = Property;

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { deleteProperty } = propertyServices;
  const id = initialValues?.id ?? "";

  const stateValue = Form.useWatch(["address", "state"], form);

  const onFinish = async (values: object): Promise<void> => {
    const detailResponse = await propertyServices.saveProperty({
      ...values,
      id: id,
    } as Property);
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
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        style={{ maxWidth: 600 }}
        initialValues={initialValues}
        onFinish={onFinish}
        autoComplete="off"
      >
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
            rules={[{ required: true, message: "Please input your password!" }]}
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
        </Card>

        <Card title="Address">
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
        </Card>

        <Card title="Property">
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
            rules={[{ required: true, message: "Please input your password!" }]}
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
            rules={[{ required: true, message: "Please input your password!" }]}
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

        <PropertyAttachments id={id} />

        <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
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
        </Form.Item>
      </Form>
    </div>
  );
};

export default PropertyForm;
