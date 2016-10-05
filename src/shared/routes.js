import { Route, IndexRoute } from "react-router";
import React from "react";

import AppHandler from "./components/AppHandler";
import Home from "./components/Home";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";

export default (
  <Route component={ AppHandler } path="/">
    <IndexRoute component={ Home } name='Home' />
    <Route component={ Page1 } name='Type1' path="page1" />
    <Route component={ Page2 } name='Type2' path="page2" />
    <Route component={ Page3 } name='Type3' path="page3" />
  </Route>
);