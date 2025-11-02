import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { localhostURL } from "../../../utility/localhostURL";
import {
  UserIsLoggedInContext,
  UserLogInContext,
} from "../../context/UserLogInContext";

export function GitHubAuthenticationToken() {
  const [userLogIn, setUserLogIn] = useContext(UserLogInContext);

  const [isUserLoggedIn, setIsUserLoggedIn] = useContext(UserIsLoggedInContext);

  const location = useLocation();

  const { pathname } = location;

  const sliceBearerTokenFromURL = pathname.slice(7);

  const navigate = useNavigate();

  if (sliceBearerTokenFromURL) {
    const bearerToken = `Bearer ${sliceBearerTokenFromURL}`;

    localStorage.setItem("token", bearerToken);
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const getLoggedInUser = async () => {
        const loggedInUser = await fetch(`${localhostURL}/users/details`, {
          mode: "cors",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        const resultLoggedInUser = await loggedInUser.json();

        setUserLogIn(resultLoggedInUser);

        setIsUserLoggedIn(true);

        navigate("/");
      };

      getLoggedInUser();
    }
  }, []);
}
