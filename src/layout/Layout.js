import React from "react";
import { Outlet } from "react-router-dom";
import NavMenu from "./NavMenu";
// import Routing from "./Routing";

const Layout = ({ user }) => {
  return (
    <div>
      <NavMenu />
      <Outlet />
      <div className="container-fluid mt-3"></div>
    </div>
  );
};

export default Layout;
