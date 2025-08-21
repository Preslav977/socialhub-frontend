import { App } from "../App";
import { LogInForm } from "../components/LogInForm/LogInForm";
import { ProtectApp } from "../components/ProtectApp/ProtectApp";
import { ProtectRoutes } from "../components/ProtectRoutes/ProtectRoutes";
import { SignUpForm } from "../components/SignUpForm/SignUpForm";
import { CreatePost } from "../pages/CreatePost";
import { MainGridInterface } from "../pages/MainGridInterface";

export const routes = [
  {
    path: "/",
    element: (
      <ProtectApp path={"/"}>
        <App />
      </ProtectApp>
    ),
    children: [
      { path: "/signup", element: <SignUpForm /> },
      {
        path: "/login",
        element: <LogInForm />,
      },
      {
        path: "/home",
        element: (
          <ProtectRoutes>
            <MainGridInterface pageProp={""}></MainGridInterface>
          </ProtectRoutes>
        ),
      },
      {
        path: "/create",
        element: (
          <ProtectRoutes>
            <MainGridInterface pageProp={<CreatePost />}></MainGridInterface>
          </ProtectRoutes>
        ),
      },
    ],
  },
];
