import { RouteObject } from "react-router";
import { Outlet } from "react-router-dom";
import LoginPage from "../../../auth/presentation/login";
import Authenticated from "../components/authenticated";
import HomePage from "@/features/home/presentation";
import SignUpPage from "@/features/auth/presentation/signup";
import PropertyPage from "@/features/properties/presentation/single";
import PropertyListPage from "@/features/properties/presentation/list";

const router: RouteObject[] = [
  {
    path: "account",
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
    ],
  },

  // {
  //   path: "/",
  //   element: <HomePage />,
  // },
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
      {
        path: "/properties",
        children: [
          {
            path: "",
            element: <PropertyListPage />,
          },
          {
            path: ":id",
            element: <PropertyPage />,
          },
          {
            path: ":id/edit",
            element: <PropertyPage />,
          },
        ],
      },
    ],
  },
];

export default router;
