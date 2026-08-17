import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import AppLayout from "../components/layout/AppLayout";
import EmployeesPage from "../features/employees/pages/EmployeesPage";
import LeavePage from "../features/leave/pages/LeavePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "employees",
        element: <EmployeesPage />,
      },
      {
        path: "leave",
        element: <LeavePage />,
      },
    ],
  },
]);
