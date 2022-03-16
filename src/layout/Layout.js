import React from "react";
import { Outlet } from "react-router-dom";
import NavMenu from "./NavMenu";
// import Routing from "./Routing";

const Layout = ({ auth }) => {
  console.log("nav Auth", auth);

  return (
    <div>
      <NavMenu auth={auth} />

      <div className="container-fluid mt-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
