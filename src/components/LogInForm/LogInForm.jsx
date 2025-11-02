import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { localhostURL } from "../../../utility/localhostURL";
import {
  UserIsLoggedInContext,
  UserLogInContext,
} from "../../context/UserLogInContext";
import styles from "./LogInForm.module.css";

export function LogInForm() {
  const [userLogIn, setUserLogIn] = useContext(UserLogInContext);

  const [isUserLoggedIn, setIsUserLoggedIn] = useContext(UserIsLoggedInContext);

  const [invalidCredentials, setInvalidCredentials] = useState("");

  const [loading, setLoading] = useState(false);

  const [loginOrGuestUser, setLoginOrGuestUser] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    const { username, password } = data;

    try {
      const response = await fetch(`${localhostURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.status >= 400) {
        setInvalidCredentials("Password or Username is incorrect");
      } else {
        const { token } = await response.json();

        const bearerToken = `Bearer ${token}`;

        localStorage.setItem("token", bearerToken);

        setInvalidCredentials("");

        setLoading(true);

        const loggedInUser = await fetch(`${localhostURL}/users/details`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        const resultLoggedInUser = await loggedInUser.json();

        setUserLogIn(resultLoggedInUser);

        setIsUserLoggedIn(true);

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onGuestSubmit = async () => {
    try {
      const response = await fetch(`${localhostURL}/login_guest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "guestuser",
          password: "12345678B",
        }),
      });

      const { token } = await response.json();

      const bearerToken = `Bearer ${token}`;

      localStorage.setItem("token", bearerToken);

      setLoading(true);

      const loggedInGuestUser = await fetch(`${localhostURL}/users/details`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const resultLoggedInGuestUser = await loggedInGuestUser.json();

      setUserLogIn(resultLoggedInGuestUser);

      setIsUserLoggedIn(true);

      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoginOrGuestUser(false);
    }
  };

  return (
    <div className={styles.gridFormWrapper}>
      <div className={styles.formFlexedContainer}>
        <div className={styles.gridLefSideContainer}>
          <img
            className={styles.gridLeftSideImg}
            src="/socialhub.png"
            alt="socialhub logo"
          />
          <p className={styles.welcomeBackPara}>Welcome back!</p>
          <p className={styles.formFillLoginInfoPara}>
            Please fill your login details
          </p>
        </div>
        <form
          className={styles.logInForm}
          onSubmit={
            !loginOrGuestUser
              ? handleSubmit(onSubmit)
              : handleSubmit(onGuestSubmit)
          }
        >
          <label htmlFor="username"></label>
          <input
            type="text"
            name="username"
            id="username"
            aria-label="username"
            defaultValue={"guestuser"}
            {...register("username", {
              required: true,
            })}
            aria-invalid={errors.username ? "true" : "false"}
          />

          {errors.username?.type === "required" && (
            <span role="alert">Username is required</span>
          )}

          <label htmlFor="password"></label>
          <input
            type="password"
            name="password"
            id="password"
            defaultValue={"12345678B"}
            aria-label="password"
            {...register("password", {
              required: true,
            })}
            aria-invalid={errors.password ? "true" : "false"}
          />

          {errors.password?.type === "required" && (
            <span role="alert">Password is required</span>
          )}

          <button className={styles.logInBtn}>Login</button>

          <button
            onClick={() => setLoginOrGuestUser(true)}
            className={styles.guestLoginBtn}
          >
            Guest User
          </button>

          <p className={styles.notHaveAnAccountPara}>
            Don't have an account?
            <Link className={styles.notHaveAnAccountAnchor} to="/signup">
              Sign Up
            </Link>
          </p>

          {loading ? (
            <div className={styles.loadingSpinnerContainer}>
              <img
                className="loadingSpinner"
                src="/loading.svg"
                alt="loading spinner"
              />
            </div>
          ) : (
            ""
          )}

          {invalidCredentials !== "" ? (
            <div className={styles.invalidCredentialsFlexedContainer}>
              <img
                className={styles.invalidCredentialsImg}
                src="./error.svg"
                alt="invalid credentials"
              />
              <p>{invalidCredentials}</p>
            </div>
          ) : (
            ""
          )}
        </form>

        <button
          onClick={() => {
            window.location.href = "http://localhost:5000/auth/github";
          }}
        >
          Github
        </button>
      </div>
      <div className={styles.gridRightSideContainer}>
        <h1 className={styles.gridRightSideHeader}>SocialHub</h1>
        <p className={styles.gridRightSidePara}>Your network, improved.</p>
        <img
          className={styles.gridRightSideImg}
          src="/socialhub.png"
          alt="socialhub logo"
        />
      </div>
    </div>
  );
}
