import React from "react";
import { Home, SignIn, SignUp, Browse } from "./pages/index";
import * as ROUTES from "./constants/routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes";
import useAuthListener from "./hooks/use-auth-listener";

export default function App() {
  const { user } = useAuthListener();
  console.log(user);
  return (
    <Router>
      <Routes>
        <Route
          element={
            <IsUserRedirect
              user={user}
              loggedInPath={ROUTES.BROWSE}
              path={ROUTES.HOME}
            />
          }
        >
          <Route exact path={ROUTES.HOME} element={<Home />} />
          <Route exact path={ROUTES.SIGNIN} element={<SignIn />} />
          <Route exact path={ROUTES.SIGNUP} element={<SignUp />} />
        </Route>

        <Route element={<ProtectedRoute user={user} />}>
          <Route exact path={ROUTES.BROWSE} element={<Browse />} />
        </Route>
      </Routes>
    </Router>
  );
}
