import useAuth from "../hooks/useAuth";
import { FC, ReactNode, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoginPage from "../../../auth/presentation/login";

interface AuthenticatedProps {
  children: ReactNode;
}

const Authenticated: FC<AuthenticatedProps> = (props: {
  children: unknown;
}) => {
  const { children } = props;
  const location = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) {
    return <div>loading</div>;
  }

  if (!isAuthenticated) {
    if (location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname);
    }

    return <LoginPage />;
  }

  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
};

export default Authenticated;
