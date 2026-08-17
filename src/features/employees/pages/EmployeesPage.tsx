import { Typography } from "@mui/material";

export default function EmployeesPage() {
  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Employees
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Employee management will be built here.
      </Typography>
    </>
  );
}
