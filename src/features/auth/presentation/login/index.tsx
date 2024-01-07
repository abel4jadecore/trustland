import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { ConfirmationResult, RecaptchaVerifier } from "firebase/auth";
import useAuth from "../../../core/presentation/hooks/useAuth";
import { auth } from "@/features/core/domain/utils/firebase";

const LoginPage = () => {
  const { signInWithPhoneNumber, verifyCode } = useAuth();
  const [result, setResult] = useState<ConfirmationResult>();
  const [isSent, setIsSent] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    onSubmit: async ({ phoneNumber }) => {
      try {
        const appVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
        });
        const response = await signInWithPhoneNumber(phoneNumber, appVerifier);
        setResult(response);
        setIsSent(true);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div>
      hemsundar
      {!result ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();

            formik.handleSubmit();
          }}
        >
          <input
            type="text"
            placeholder="phone number"
            name="phoneNumber"
            onChange={formik.handleChange}
          />
          <button type="submit">Send OTP </button>
        </form>
      ) : (
        <form
          onSubmit={(e) => {
            event?.preventDefault();

            verifyCode(code, result);
          }}
        >
          <input
            type="text"
            placeholder="otp"
            name="phoneNumber"
            onChange={(e) => {
              setCode(e.target.value);
            }}
            value={code}
          />
          <button type="submit">Sign IN</button>
        </form>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default LoginPage;
