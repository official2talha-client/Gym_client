import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGetCurrentUserQuery } from "../api/userApi.js";

function AdminProtect() {
  const token = localStorage.getItem("token");

  const {
    data,
    isLoading,
    isError,
  } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });

  // No token → not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Still checking current user
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading....
      </div>
    );
  }

  // Token invalid / request failed
  if (isError) {
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }

  // Check admin role
  const isAdmin = data?.data?.role === "admin";

  // Logged in but NOT admin
  if (!isAdmin) {
    return <Navigate to="/forbidden" replace />;
  }

  // Authenticated admin
  return <Outlet />;
}

export { AdminProtect };