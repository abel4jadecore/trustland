import useAuth from "@/features/core/presentation/hooks/useAuth";
import { useFormik } from "formik";
import Switcher from "@/features/core/presentation/components/switcher";
import { Link } from "react-router-dom";
import { Input, Form, Button } from "antd";
import BackgroundImage from "@/assets/images/bg/01.jpg";
import Icon from "@/assets/images/logo-icon-64.png";

const { TextArea } = Input;

const StoreUserData = () => {
  const { user, storeUserData } = useAuth();

  const onFinish = (values: any) => {
    try {
      storeUserData({
        ...values,
        id: user!.id,
        phoneNumber: user!.phoneNumber,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
        <div id="recaptcha-container"></div>;
        <div
          style={{ backgroundImage: `url(${BackgroundImage})` }}
          className="absolute inset-0 image-wrap z-1 bg-no-repeat bg-center bg-cover"
        ></div>
        <div className="container z-3">
          <div className="flex justify-center">
            <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-700 rounded-md">
              <Link to="/index">
                <img src={Icon} className="mx-auto" alt="" />
              </Link>
              <h5 className="my-6 text-xl font-semibold text-center">
                Register User
              </h5>
              <Form onFinish={onFinish}>
                <div className="text-start">
                  <div className="grid grid-cols-1">
                    {[
                      {
                        label: "First Name",
                        name: "firstName",
                        type: "string",
                      },
                      { label: "Last Name", name: "lastName", type: "string" },
                      { label: "Email", name: "email", type: "email" },
                      { label: "Address", name: "address", type: "textArea" },
                    ].map((item) => (
                      <div className="">
                        <label className="font-medium" htmlFor="LoginEmail">
                          {item.label}:
                        </label>
                        <Form.Item
                          className="mt-2"
                          name={item.name}
                          rules={[
                            {
                              required: true,
                              message: "Please input your username!",
                            },
                          ]}
                        >
                          {item.type === "textArea" ? (
                            <TextArea placeholder={item.label} />
                          ) : (
                            <Input type="text" placeholder={item.label} />
                          )}
                        </Form.Item>
                      </div>
                    ))}

                    <div className="mb-4">
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="bg-green-600 hover:bg-green-700 text-whit"
                        block
                      >
                        {"Register"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>
      <Switcher />
    </>
  );
};

export default StoreUserData;
