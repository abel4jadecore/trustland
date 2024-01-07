import { ConfirmationResult } from "firebase/auth";
import { useState } from "react";
import RequestVerificationCodeForm from "./requestVerificationCodeForm";
import VerifyCodeForm from "./verifyCodeForm";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [result, setResult] = useState<ConfirmationResult>();

  return (
    <div>
      trustland
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
