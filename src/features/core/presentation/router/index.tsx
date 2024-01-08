import { RouteObject } from "react-router";
import { Outlet } from "react-router-dom";
import LoginPage from "../../../auth/presentation/login";
import Authenticated from "../components/authenticated";
import HomePage from "@/features/home/presentation";
import SignUpPage from "@/features/auth/presentation/signup";
import SinglePropertyPage from "@/features/properties/presentation/single";

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
            element: null,
          },
          {
            path: ":id",
            element: <SinglePropertyPage />,
          },
        ],
      },
    ],
  },
];

export default router;
