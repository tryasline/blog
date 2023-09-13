import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

import classes from "./Profile.module.scss";

import { useAppDispatch, useAppSelector } from "../../hook/redux-hook";
import { actionAccount } from "../API/API";
import { GetCookie } from "../../hook/Cookies";
import { fetchUpdate } from "../../store/reducer/user/action-creator";
import validateUrl from "../../utils/validateUrl";

interface CreateAccountForm {
  username: string;
  email: string;
  newpassword: string;
  avatar: string;
}

const Profile: FC = () => {
  const dispatch = useAppDispatch();

  // actionAccount
  //   .update(
  //     {
  //       username: "valeron",
  //       email: "valeronmaleron@mail.ru",
  //       newpassword: "7654321",
  //       image: "afsdf",
  //     },
  //     JSON.parse(GetCookie("userToken")!)
  //   )
  //   .then((res) => console.log(res));

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm<CreateAccountForm>({
    mode: "onChange",
  });
  const onSubmit = (data: any) => {
    const { username, email, newpassword: password, avatar: image } = data;
    dispatch(
      fetchUpdate(
        { username, email, password, image },
        JSON.parse(GetCookie("userToken")!)
      )
    );
    localStorage.setItem(
      "userData",
      JSON.stringify({ username, email, password })
    );
    reset();
  };

  const valUrl = () => {
    if (watch("avatar") === "") return true;
    return validateUrl(watch("avatar"));
  };

  return (
    <div className={classes.accountWrap}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Edit Profile</h3>
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
          <span>New Password</span>
          <input
            type="password"
            placeholder="New password"
            {...register("newpassword", {
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
            {errors?.newpassword && (
              <p>{errors.newpassword.message || "Error"}</p>
            )}
          </div>
        </label>

        <label className={classes.inputWrap}>
          <span>Avatar image (url)</span>
          <input
            placeholder="Avatar image"
            {...register("avatar", {
              validate: valUrl,
            })}
          ></input>
          <div className={classes.errorName}>
            {errors?.avatar && <p>{"Невалидный адресс фотографии"}</p>}
          </div>
        </label>

        <button className={classes.buttonSubmit}>Save</button>
      </form>
    </div>
  );
};

export default Profile;
