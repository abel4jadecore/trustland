import useAuth from "@/features/core/presentation/hooks/useAuth";
import { useFormik } from "formik";

const StoreUserData = () => {
  const { user, storeUserData } = useAuth();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
    },
    onSubmit: async (values) => {
      try {
        storeUserData({
          ...values,
          id: user!.id,
          phoneNumber: user!.phoneNumber,
        });
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div>
      user data
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="firstName"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        <input
          type="text"
          name="lastName"
          placeholder="lastName"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <input
          type="text"
          name="address"
          placeholder="address"
          onChange={formik.handleChange}
          value={formik.values.address}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default StoreUserData;
