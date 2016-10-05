import { Route } from "react-router";
import React from "react";

import AppHandler from "./components/AppHandler";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";

function onEnter({ params }, replace) {
  //console.log('onEnter', arguments)
}

function onChange() {
  //console.log('onChange', arguments)
}

export default (
  <Route component={ AppHandler } onEnter={onEnter} onChange={onChange} path="/">
    <Route component={ Page1 } onEnter={onEnter} onChange={onChange} path="page1" />
    <Route component={ Page2 } onEnter={onEnter} onChange={onChange} path="page2" />
    <Route component={ Page3 } onEnter={onEnter} onChange={onChange} path="page3" />
  </Route>
);