import { useContext } from "react";
import { UserLogInContext } from "../../context/UserLogInContext";
import { LogInForm } from "../LogInForm/LogInForm";

export function ProtectRoutes({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useContext(UserLogInContext);

  if (!isUserLoggedIn) {
    return <LogInForm />;
  } else {
    return children;
  }
}
