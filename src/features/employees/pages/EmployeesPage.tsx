import { Box, Button, Typography } from "@mui/material";
import EmployeeTable from "../components/EmployeeTable";
import { mockEmployees } from "../data/mockEmployees";

export default function EmployeesPage() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
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

      <EmployeeTable employees={mockEmployees} />
    </Box>
  );
}
