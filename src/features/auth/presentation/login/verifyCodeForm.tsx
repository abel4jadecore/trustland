import useAuth from "@/features/core/presentation/hooks/useAuth";
import { ConfirmationResult } from "firebase/auth";
import { useFormik } from "formik";

const VerifyCodeForm = ({ result }: { result: ConfirmationResult }) => {
  const { verifyCode } = useAuth();

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: async ({ code }) => {
      verifyCode(code, result);
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event?.preventDefault();
        formik.handleSubmit();
      }}
    >
      <input
        type="text"
        placeholder="otp"
        name="code"
        onChange={formik.handleChange}
        value={formik.values.code}
      />
      <button type="submit">Sign IN</button>
    </form>
  );
};

export default VerifyCodeForm;
