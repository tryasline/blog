import classes from "./index.module.scss";

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.nameBlog}>
        <h4>Realworld Blog</h4>
      </div>
      <div className={classes.loginPlace}>
        <button className={classes.signIn}>
          <span>Sign In</span>
        </button>
        <button className={classes.signUp}>
          <span>Sign Up</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
