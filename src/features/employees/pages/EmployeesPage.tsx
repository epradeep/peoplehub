import { Box, Button, Typography } from "@mui/material";
import EmployeeTable from "../components/EmployeeTable";
import { mockEmployees } from "../data/mockEmployees";
import EmployeeToolbar from "../components/EmployeeToolbar";
import { useState } from "react";
import type { Employee, EmployeeStatus } from "../types/employee";
import EmployeeForm from "../components/EmployeeForm";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(mockEmployees);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [selectedStatus, setSelectedStatus] = useState<
    EmployeeStatus | "All Statuses"
  >("All Statuses");

  const [openForm, setOpenForm] = useState(false);

  const handleClickOpen = () => setOpenForm(true);
  const handleClose = () => setOpenForm(false);

  const handleAddEmployee = (employee: Employee) => {
    setEmployees((prev) => {
      const nextNumber =
        prev.reduce((max, emp) => {
          const number = Number(emp.employeeCode.replace("EMP", ""));
          return Math.max(max, number);
        }, 0) + 1;

      const newEmployee: Employee = {
        ...employee,
        employeeCode: `EMP${String(nextNumber).padStart(3, "0")}`,
      };

      return [...prev, newEmployee];
    });
    setOpenForm(false);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Employees
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Manage employees, departments, roles and information
          </Typography>
        </Box>
        <Box>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add Employee
          </Button>
        </Box>
      </Box>

      <EmployeeToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      <EmployeeTable
        employees={employees}
        searchTerm={searchTerm}
        department={selectedDepartment}
        status={selectedStatus}
      />

      <EmployeeForm
        open={openForm}
        onClose={handleClose}
        onSubmit={handleAddEmployee}
      />
    </Box>
  );
}
