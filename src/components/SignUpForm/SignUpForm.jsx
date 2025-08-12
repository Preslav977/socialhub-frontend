import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { localhostURL } from "../../../utility/localhostURL";
import { passwordRegex } from "../../../utility/passwordRegex";
import { UserSignUpContext } from "../../context/UserSignUpContext";

export function SignUpForm() {
  const { userSignUp, setUserSignUp } = useContext(UserSignUpContext);

  const [usernameError, setUsernameError] = useState("");

  const [displayNameError, setDisplayNameError] = useState("");

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username"></label>

      <input
        type="text"
        {...register("username", {
          required: true,
          minLength: 1,
          maxLength: 30,
        })}
        aria-invalid={errors.username ? "true" : "false"}
      />

      <span role="alert">{usernameError}</span>

      {errors.username?.type === "required" && (
        <span role="alert">User name is required</span>
      )}

      {errors.username?.type === "minLength" ||
        (errors.username?.type === "maxLength" && (
          <span role="alert">Username must be between 1 and 30 characters</span>
        ))}

      <label htmlFor="display_name"></label>

      <input
        type="text"
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
      <input
        type="password"
        {...register("password", {
          required: true,
          minLength: 8,
          pattern: passwordRegex,
        })}
      />

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

      <input
        type="password"
        {...register("confirm_password", {
          required: true,
          minLength: 8,
          validate: (value) => {
            const { password } = getValues();

            return password === value;
          },
        })}
      />

      {errors.confirm_password?.type === "required" && (
        <span role="alert">Confirm password is required</span>
      )}

      {errors.confirm_password?.type === "validate" && (
        <span role="alert">Passwords much match</span>
      )}

      <button type="submit">Sign up</button>
    </form>
  );
}
