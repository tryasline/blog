import { FC, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../hook/redux-hook';
import { fetchAuth } from '../../store/reducer/user/action-creator';

import classes from './SignIn.module.scss';

interface SignInAccountForm {
  email: string;
  password: string;
}

const SignInPage: FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SignInAccountForm>({
    mode: 'onChange',
  });
  const onSubmit = (data: any) => {
    localStorage.setItem('userData', JSON.stringify(data));
    dispatch(fetchAuth(data));
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  return (
    <div className={classes.accountWrap}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Sign In</h3>
        <label className={classes.inputWrap}>
          <span>Email address</span>
          <input
            placeholder="Email address"
            {...register('email', {
              required: 'Обязательное поле',
              pattern: {
                value: /([a-z\d]+)@([gmail-mail-yandex]+)\.([com-ru]+)/,
                message: 'Email должен начинаться с нижнего регистра',
              },
            })}
          />
          <div className={classes.errorName}>{errors?.email && <p>{errors.email.message || 'Error'}</p>}</div>
        </label>

        <label className={classes.inputWrap}>
          <span>Password</span>
          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Обязательное поле',
              minLength: {
                value: 6,
                message: 'Минимальная длина пароля 6 символа',
              },
              maxLength: {
                value: 40,
                message: 'Максимальная длина пароля 40 символов',
              },
            })}
          />
          <div className={classes.errorName}>{errors?.password && <p>{errors.password.message || 'Error'}</p>}</div>
        </label>

        <button className={classes.buttonSubmit} disabled={!isValid} type="submit">
          Login
        </button>

        <div className={classes.redirectLogin}>
          <span>Don’t have an account?</span>
          <NavLink
            to="/sign-up"
            className={({ isActive, isPending }) =>
              isPending ? `${classes.pending}` : isActive ? `${classes.active}` : ''
            }
          >
            <span>Sign Up.</span>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
