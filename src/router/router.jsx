import { createBrowserRouter } from "react-router-dom";

import { App } from "../App";
import { LogInForm } from "../components/LogInForm/LogInForm";
import { SignUpForm } from "../components/SignUpForm/SignUpForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: "",
    children: [
      { path: "/signup", element: <SignUpForm /> },
      { path: "/login", element: <LogInForm /> },
    ],
  },
]);
