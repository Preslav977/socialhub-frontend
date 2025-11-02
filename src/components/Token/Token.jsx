import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { localhostURL } from "../../../utility/localhostURL";
import {
  UserIsLoggedInContext,
  UserLogInContext,
} from "../../context/UserLogInContext";

export function Token() {
  const [userLogIn, setUserLogIn] = useContext(UserLogInContext);

  const [isUserLoggedIn, setIsUserLoggedIn] = useContext(UserIsLoggedInContext);

  const location = useLocation();

  const { pathname } = location;

  const testing = pathname.slice(7);

  const navigate = useNavigate();

  console.log(testing);

  if (testing) {
    const bearerToken = `Bearer ${testing}`;

    localStorage.setItem("token", bearerToken);
    // console.log("Token has been saved");
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const fetching = async () => {
        const loggedInUser = await fetch(`${localhostURL}/users/details`, {
          mode: "cors",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        console.log(loggedInUser);

        const resultLoggedInUser = await loggedInUser.json();

        // console.log(resultLoggedInUser);

        setUserLogIn(resultLoggedInUser);

        setIsUserLoggedIn(true);

        navigate("/");
      };

      fetching();
    }
  }, []);
}
