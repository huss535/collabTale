import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";
import { Spinner } from "@chakra-ui/react";


export default function PrivateRoute({ component: Component, ...rest }: any) {
  const user = useAuth();
  const isLoading = user === null; // Check if authentication status is still loading

  if (isLoading) {
    // Render loading indicator if authentication status is still loading
    return <Spinner />;
  }

  return user ? <Component {...rest} /> : <Navigate to="/" replace />;
}
