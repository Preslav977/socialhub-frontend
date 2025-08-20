import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { LogInForm } from "../components/LogInForm/LogInForm";
import { ProtectApp } from "../components/ProtectApp/ProtectApp";
import { ProtectRoutes } from "../components/ProtectRoutes/ProtectRoutes";
import { SignUpForm } from "../components/SignUpForm/SignUpForm";
import { MainGridInterface } from "../pages/MainGridInterface";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectApp path={"/"}>
        <App />
      </ProtectApp>
    ),
    errorElement: "",
    children: [
      { path: "/signup", element: <SignUpForm /> },
      { path: "/login", element: <LogInForm /> },
      {
        path: "/home",
        element: (
          <ProtectRoutes>
            <MainGridInterface></MainGridInterface>
          </ProtectRoutes>
        ),
        index: true,
      },
    ],
  },
]);
