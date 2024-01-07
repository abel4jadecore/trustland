import { RouteObject } from "react-router";
import { Outlet } from "react-router-dom";
import LoginPage from "../../../auth/presentation/login";
import Authenticated from "../components/authenticated";
import HomePage from "@/features/home/presentation";

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
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
];

export default router;
