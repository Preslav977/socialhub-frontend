import { App } from "../App";
import { LogInForm } from "../components/LogInForm/LogInForm";
import { SignUpForm } from "../components/SignUpForm/SignUpForm";
import { MainGridInterface } from "../pages/MainGridInterface";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/signup", element: <SignUpForm /> },
      {
        path: "/login",
        element: <LogInForm />,
      },
      { path: "/home", element: <MainGridInterface></MainGridInterface> },
    ],
  },
];
