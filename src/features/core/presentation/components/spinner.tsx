import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Spinner = () => {
  return (
    <Flex justify="center" align="center" style={{ height: "80vh" }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 68 }} spin />} />
    </Flex>
  );
};

export default Spinner;
