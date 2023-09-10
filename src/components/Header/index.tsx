import { NavLink } from "react-router-dom";
import classes from "./index.module.scss";

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.nameBlog}>
        <h4>Realworld Blog</h4>
      </div>
      <div className={classes.loginPlace}>
        <button className={classes.signIn}>
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
            <span>Sign In</span>
          </NavLink>
        </button>
        <button className={classes.signUp}>
          <span>Sign Up</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
