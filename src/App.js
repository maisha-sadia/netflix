import React from "react";
import { Home, SignIn, SignUp, Browse } from "./pages/index";
import * as ROUTES from "./constants/routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={ROUTES.HOME} element={<Home />}></Route>
        <Route exact path={ROUTES.SIGNIN} element={<SignIn />}></Route>
        <Route exact path={ROUTES.SIGNUP} element={<SignUp />}></Route>
        <Route exact path={ROUTES.BROWSE} element={<Browse />}></Route>
      </Routes>
    </Router>
  );
}
