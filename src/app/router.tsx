import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div></div>,
  },
  {
    path: "/login",
    element: <div>Login</div>,
  },
  {
    path: "/dashboard",
    element: <div>Dashboard</div>,
  },
  {
    path: "/employees",
    element: <div>Employees</div>,
  },
  {
    path: "/leave",
    element: <div>Leave Management</div>,
  },
]);
