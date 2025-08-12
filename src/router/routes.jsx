import { App } from "../App";
import { SignUpForm } from "../components/SignUpForm/SignUpForm";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [{ path: "/signup", element: <SignUpForm /> }],
  },
];
