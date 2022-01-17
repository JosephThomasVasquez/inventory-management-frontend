import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={"/"} />
      </Route>
    </Switch>
  );
};

export default Routes;
