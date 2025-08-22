import { useNavigate } from "react-router-dom";

// import { UserIsLoggedInContext } from "../../context/UserLogInContext";

export function ProtectApp({ children, path }) {
  const navigate = useNavigate();

  // const [isUserLoggedIn, setIsUserLoggedIn] = useContext(UserIsLoggedInContext);

  // useEffect(() => {
  //   if (path === "/") {
  //     navigate("/login");
  //   }
  // }, [path]);

  return children;
}
