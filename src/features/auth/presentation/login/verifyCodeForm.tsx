import useAuth from "@/features/core/presentation/hooks/useAuth";
import { ConfirmationResult } from "firebase/auth";
import { useFormik } from "formik";
import { useState } from "react";

const VerifyCodeForm = ({ result }: { result: ConfirmationResult }) => {
  const { verifyCode } = useAuth();

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: async ({ code }, formikHelpers) => {
      verifyCode(code, result);
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event?.preventDefault();
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
