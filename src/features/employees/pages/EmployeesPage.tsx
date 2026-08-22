import { Box, Button, Typography } from "@mui/material";
import EmployeeTable from "../components/EmployeeTable";
import { mockEmployees } from "../data/mockEmployees";
import EmployeeToolbar from "../components/EmployeeToolbar";
import { useState } from "react";
import type { EmployeeStatus } from "../types/employee";

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [selectedStatus, setSelectedStatus] = useState<
    EmployeeStatus | "All Statuses"
  >("All Statuses");

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

      <EmployeeTable
        employees={mockEmployees}
        searchTerm={searchTerm}
        department={selectedDepartment}
        status={selectedStatus}
      />
    </Box>
  );
}
