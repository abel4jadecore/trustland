import { RouteObject } from "react-router";
import { Outlet } from "react-router-dom";
import LoginPage from "../../../auth/presentation/login";
import Authenticated from "../components/authenticated";

const router: RouteObject[] = [
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      // {
      //   path: "register",
      //   element: <RegisterPage />,
      // },
    ],
  },

  {
    path: "/",
    element: (
      <Authenticated>
        <Outlet />
      </Authenticated>
    ),
    children: [],
  },
];

export default router;
