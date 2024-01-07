import { ConfirmationResult, RecaptchaVerifier } from "firebase/auth";
import { useFormik } from "formik";
import { auth } from "@/features/core/domain/utils/firebase";
import useAuth from "@/features/core/presentation/hooks/useAuth";

const RequestVerificationCodeForm = ({
  setResult,
}: {
  setResult: (result: ConfirmationResult) => void;
}) => {
  const { signInWithPhoneNumber } = useAuth();

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
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
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
        value={formik.values.phoneNumber}
      />
      <button type="submit">Request verification code</button>
    </form>
  );
};

export default RequestVerificationCodeForm;
