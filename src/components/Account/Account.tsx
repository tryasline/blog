import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

import classes from "./Account.module.scss";
import { NavLink } from "react-router-dom";

interface CreateAccountForm {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  agree: boolean;
}

const Account: FC = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm<CreateAccountForm>({
    mode: "onChange",
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };
  //   console.log(errors, isValid, watch("password"), watch("repeatPassword"));

  const validatePas = () => {
    return watch("password") === watch("repeatPassword");
  };

  return (
    <div className={classes.accountWrap}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Create new account</h3>
        <label className={classes.inputWrap}>
          <span>Username</span>
          <input
            placeholder="Username"
            {...register("username", {
              required: "Обязательное поле",
              minLength: {
                value: 3,
                message: "Минимальная длина имени 3 символа",
              },
              maxLength: {
                value: 20,
                message: "Максимальная длина имени 20 символов",
              },
            })}
          ></input>
          <div className={classes.errorName}>
            {errors?.username && <p>{errors.username.message || "Error"}</p>}
          </div>
        </label>

        <label className={classes.inputWrap}>
          <span>Email address</span>
          <input
            placeholder="Email address"
            {...register("email", {
              required: "Обязательное поле",
              pattern: {
                value: /([a-z\d]+)@([gmail-mail-yandex]+)\.([com-ru]+)/,
                message: "Email должен начинаться с нижнего регистра",
              },
            })}
          ></input>
          <div className={classes.errorName}>
            {errors?.email && <p>{errors.email.message || "Error"}</p>}
          </div>
        </label>

        <label className={classes.inputWrap}>
          <span>Password</span>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Обязательное поле",
              minLength: {
                value: 6,
                message: "Минимальная длина пароля 6 символа",
              },
              maxLength: {
                value: 40,
                message: "Максимальная длина пароля 40 символов",
              },
            })}
          ></input>
          <div className={classes.errorName}>
            {errors?.password && <p>{errors.password.message || "Error"}</p>}
          </div>
        </label>

        <label className={classes.inputWrap}>
          <span>Repeat Password</span>
          <input
            type="password"
            placeholder="Repeat Password"
            {...register("repeatPassword", {
              required: true,
              validate: validatePas,
            })}
          ></input>
          <div className={classes.errorName}>
            {errors?.repeatPassword && <p>{"Пароли дожны совпадать"}</p>}
          </div>
        </label>

        <label className={`${classes.inputWrap} ${classes.checkBox}`}>
          <span>I agree to the processing of my personal information</span>
          <input
            type="checkbox"
            {...register("agree", { required: true })}
          ></input>
          <div className={classes.errorName}>
            {errors?.agree && <p>{"Обязательное поле"}</p>}
          </div>
        </label>

        <button className={classes.buttonSubmit} disabled={!isValid}>
          Create
        </button>

        <div className={classes.redirectLogin}>
          <span>Already have an account?</span>
          <NavLink
            to={"/sign-in"}
            className={({ isActive, isPending }) =>
              isPending
                ? `${classes.pending}`
                : isActive
                ? `${classes.active}`
                : ""
            }
          >
            <span>Sign In.</span>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Account;
