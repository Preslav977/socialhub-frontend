import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { localhostURL } from "../../../utility/localhostURL";
import { passwordRegex } from "../../../utility/passwordRegex";
import { UserSignUpContext } from "../../context/UserSignUpContext";

import { Link } from "react-router-dom";

import styles from "./SignUpForm.module.css";

export function SignUpForm() {
  const { userSignUp, setUserSignUp } = useContext(UserSignUpContext);

  const [usernameError, setUsernameError] = useState("");

  const [displayNameError, setDisplayNameError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { username, display_name, password, confirm_password } = data;

    const signUpUser = {
      ...userSignUp,
      username: username,
      display_name: display_name,
      password: password,
      confirm_password: confirm_password,
    };

    setUserSignUp(signUpUser);

    try {
      const response = await fetch(`${localhostURL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          display_name: display_name,
          password: password,
          confirm_password: confirm_password,
        }),
      });

      if (response.status >= 400) {
        const errors = await response.json();

        errors.forEach((err) => {
          if (err.msg.startsWith("Username")) {
            setUsernameError(err.msg);
          } else {
            setDisplayNameError(err.msg);
          }
        });
      } else {
        reset();
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className={styles.gridFormWrapper}>
      <div className={styles.formFlexedContainer}>
        <div className={styles.gridLeftSideContainer}>
          <img
            className={styles.gridLeftSideImg}
            src="./socialhub-black.png"
            alt="socialhub logo"
          />
          <p className={styles.joinUsPara}>Join us Today!</p>
          <p className={styles.formFillInfoPara}>
            Please fill in your details above below
          </p>
        </div>
        <form className={styles.signUpForm} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username"></label>
          <input
            type="text"
            name="username"
            id="username"
            aria-label="username"
            {...register("username", {
              required: true,
              minLength: 1,
              maxLength: 30,
            })}
            aria-invalid={errors.username ? "true" : "false"}
          />
          <span role="alert">{usernameError}</span>
          {errors.username?.type === "required" && (
            <span role="alert">Username is required</span>
          )}
          {errors.username?.type === "minLength" ||
            (errors.username?.type === "maxLength" && (
              <span role="alert">
                Username must be between 1 and 30 characters
              </span>
            ))}
          <label htmlFor="display_name"></label>
          <input
            type="text"
            name="display_name"
            id="display_name"
            aria-label="display_name"
            {...register("display_name", { required: true })}
            aria-invalid={errors.display_name ? "true" : "false"}
          />

          <span role="alert">{displayNameError}</span>

          {errors.display_name?.type === "required" && (
            <span role="alert">Display name is required</span>
          )}
          {errors.display_name?.type === "minLength" ||
            (errors.display_name?.type === "maxLength" && (
              <span role="alert">
                Display name must be between 1 and 30 characters
              </span>
            ))}
          <label htmlFor="password"></label>
          <div className={styles.formPasswordInputContainer}>
            <input
              name="password"
              id="password"
              aria-label="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: true,
                minLength: 8,
                pattern: passwordRegex,
              })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            <img
              onClick={() => setShowPassword((password) => !password)}
              className={styles.showPasswordSvg}
              src={
                !showPassword ? "./show password.svg" : "./hide password.svg"
              }
              alt="show or hide password eye"
            />
          </div>

          {errors.password?.type === "required" && (
            <span role="alert">Password is required</span>
          )}
          {errors.password?.type === "pattern" && (
            <span role="alert">
              Password must be minimum 8 characters, and contain at least one
              letter, and one number
            </span>
          )}
          <label htmlFor="confirm_password"></label>

          <div className={styles.formPasswordInputContainer}>
            <input
              name="confirm_password"
              id="confirm_password"
              aria-label="confirm_password"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirm_password", {
                required: true,
                minLength: 8,
                validate: (value) => {
                  const { password } = getValues();

                  return password === value;
                },
              })}
              aria-invalid={errors.confirm_password ? "true" : "false"}
            />
            <img
              onClick={() => setShowConfirmPassword((password) => !password)}
              className={styles.showPasswordSvg}
              src={
                !showConfirmPassword
                  ? "./show password.svg"
                  : "./hide password.svg"
              }
              alt=""
            />
          </div>

          {errors.confirm_password?.type === "required" && (
            <span role="alert">Confirm password is required</span>
          )}
          {errors.confirm_password?.type === "validate" && (
            <span role="alert">Passwords much match</span>
          )}

          <button className={styles.signUpBtn} type="submit">
            Sign up
          </button>

          <p className={styles.alreadyHaveAccountPara}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
      <div className={styles.gridRightSideContainer}>
        <h1 className={styles.gridRightSideHeader}>SocialHub</h1>
        <p className={styles.gridRightSidePara}>Your network, improved.</p>
        <img
          className={styles.gridRightSideImage}
          src="./socialhub-black.png"
          alt="socialhub logo"
        />
      </div>
    </div>
  );
}
