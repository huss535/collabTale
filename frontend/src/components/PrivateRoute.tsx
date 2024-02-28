import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";

export default function PrivateRoute({ component: Component, ...rest }: any) {
  const user = useAuth();


  return user ? <Component {...rest} /> : <Navigate to="/" />;
}

/*onAuthStateChanged(auth, (user) => {
   if (user) { setAuthenticated(true); }
   else { setAuthenticated(false); }

 });

 alert(authenticated);*/