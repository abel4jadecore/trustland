import { ConfirmationResult } from "firebase/auth";
import { useState } from "react";
import RequestVerificationCodeForm from "./requestVerificationCodeForm";
import VerifyCodeForm from "./verifyCodeForm";

const LoginPage = () => {
  const [result, setResult] = useState<ConfirmationResult>();

  return (
    <div>
      hemsundar
      {!result ? (
        <RequestVerificationCodeForm setResult={setResult} />
      ) : (
        <VerifyCodeForm result={result} />
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default LoginPage;
