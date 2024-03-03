import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const PrivateRoute = ({ children }) => {

  const user = useRecoilValue(userAtom);
  //const location = useLocation();

  if (user) {
    console.log("User - ", user);
    return children;
  } else {
    console.log("User Un-Authenticated or Not Found", user, "Navigating to Landing Page...");
    return <Navigate to="/"/>;
  }
};

export default PrivateRoute;