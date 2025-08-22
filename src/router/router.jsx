import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { CreatePost } from "../components/CreatePost/CreatePost";
import { LogInForm } from "../components/LogInForm/LogInForm";
import { ProtectApp } from "../components/ProtectApp/ProtectApp";
import { ProtectRoutes } from "../components/ProtectRoutes/ProtectRoutes";
import { SearchForUser } from "../components/SearchForUser/SearchForUser";
import { SignUpForm } from "../components/SignUpForm/SignUpForm";
import { MainGridInterface } from "../pages/MainGrindInterface/MainGridInterface";
import { Settings } from "../pages/Settings/Settings";

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
            <MainGridInterface pageProp={""}></MainGridInterface>
          </ProtectRoutes>
        ),
        index: true,
      },
      {
        path: "/create",
        element: (
          <ProtectRoutes>
            <MainGridInterface pageProp={<CreatePost />}></MainGridInterface>
          </ProtectRoutes>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectRoutes>
            <MainGridInterface pageProp={<Settings />}></MainGridInterface>
          </ProtectRoutes>
        ),
      },
      {
        path: "/search",
        element: (
          <ProtectRoutes>
            <MainGridInterface pageProp={<SearchForUser />}></MainGridInterface>
          </ProtectRoutes>
        ),
      },
    ],
  },
]);
