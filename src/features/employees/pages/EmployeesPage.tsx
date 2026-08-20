import { Box, Button, Typography } from "@mui/material";
import EmployeeTable from "../components/EmployeeTable";
import { mockEmployees } from "../data/mockEmployees";
import EmployeeToolbar from "../components/EmployeeToolbar";
import { useState } from "react";

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  const search = searchTerm.toLowerCase().trim();
  const filteredEmployees = mockEmployees.filter(
    (employee) =>
      (employee.firstName.toLowerCase().includes(search) ||
        employee.lastName.toLowerCase().includes(search) ||
        employee.email.toLowerCase().includes(search) ||
        employee.employeeCode.toLowerCase().includes(search) ||
        employee.department.toLowerCase().includes(search) ||
        employee.designation.toLowerCase().includes(search)) &&
      (selectedDepartment === "All Departments"
        ? true
        : employee.department === selectedDepartment) &&
      (selectedStatus === "All Statuses"
        ? true
        : employee.status === selectedStatus),
  );

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
          <Button variant="contained" color="primary">
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

      <EmployeeTable employees={filteredEmployees} />
    </Box>
  );
}
