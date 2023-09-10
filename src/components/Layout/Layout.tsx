import { Outlet } from "react-router-dom";
import Header from "../Header";

import s from "../App/App.module.scss";

const Layout = () => {
  return (
    <div className={s.appWrapper}>
      <Header />
      <div className={s.appWrapperContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
