import { NavLink } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../hook/redux-hook";
import { logOut } from "../../store/reducer/user/action-creator";

import classes from "./index.module.scss";

import photo from "../../assets/images/Rectangle 1.svg";

const Header = () => {
  const { isAuth, username } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const accountLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className={classes.header}>
      <div className={classes.nameBlog}>
        <NavLink to={"/"}>
          <h4>Realworld Blog</h4>
        </NavLink>
      </div>
      {!isAuth && (
        <div className={classes.loginPlace}>
          <button className={classes.signIn}>
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
              <span>Sign In</span>
            </NavLink>
          </button>
          <button className={classes.signUp}>
            <NavLink
              to={"/sign-up"}
              className={({ isActive, isPending }) =>
                isPending
                  ? `${classes.pending}`
                  : isActive
                  ? `${classes.active}`
                  : ""
              }
            >
              <span>Sign up</span>
            </NavLink>
          </button>
        </div>
      )}
      {isAuth && (
        <div className={classes.userPlace}>
          <button className={classes.creatArticle}>
            <NavLink
              to={"/creat-article"}
              className={({ isActive, isPending }) =>
                isPending
                  ? `${classes.pending}`
                  : isActive
                  ? `${classes.active}`
                  : ""
              }
            >
              <span>Create article</span>
            </NavLink>
          </button>
          <div className={classes.username}>
            <NavLink
              to={"/profile"}
              className={({ isActive, isPending }) =>
                isPending
                  ? `${classes.pending}`
                  : isActive
                  ? `${classes.active}`
                  : ""
              }
            >
              <span>{username}</span>
            </NavLink>
          </div>
          <div className={classes.userPhoto}>
            <NavLink
              to={"/profile"}
              className={({ isActive, isPending }) =>
                isPending
                  ? `${classes.pending}`
                  : isActive
                  ? `${classes.active}`
                  : ""
              }
            >
              <img src={photo} alt="photoUser" />
            </NavLink>
          </div>
          <button className={classes.logOut} onClick={accountLogOut}>
            <span>Log out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
