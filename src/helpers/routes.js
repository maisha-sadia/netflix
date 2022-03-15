import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { SignIn } from "../pages";

export function IsUserRedirect({ user, loggedInPath }) {
  return !user ? <Outlet /> : <Navigate to={{ pathname: loggedInPath }} />;
}

export function ProtectedRoute({ user }) {
  return user ? <Outlet /> : <SignIn />;
}
