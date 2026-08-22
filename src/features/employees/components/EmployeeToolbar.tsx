import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import type { EmployeeStatus } from "../types/employee";

interface EmployeeToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (value: string) => void;
  selectedStatus: EmployeeStatus | "All Statuses";
  onStatusChange: (value: EmployeeStatus | "All Statuses") => void;
}
export default function EmployeeToolbar({
  searchTerm,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  selectedStatus,
  onStatusChange,
}: EmployeeToolbarProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "2fr 1fr 1fr",
        },
        gap: 2,
        my: 3,
        width: "100%",
      }}
    >
      <TextField
        fullWidth
        id="search-employees"
        label="Search employees..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <FormControl fullWidth>
        <InputLabel id="department-label">Department</InputLabel>
        <Select
          labelId="department-label"
          id="department-select"
          label="Department"
          value={selectedDepartment}
          onChange={(e) => onDepartmentChange(e.target.value)}
        >
          <MenuItem value="All Departments">All Departments</MenuItem>
          <MenuItem value="Engineering">Engineering</MenuItem>
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
          <MenuItem value="Sales">Sales</MenuItem>
          <MenuItem value="Marketing">Marketing</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          id="status-select"
          label="Status"
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <MenuItem value="All Statuses">All Statuses</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
          <MenuItem value="On Leave">On Leave</MenuItem>
          <MenuItem value="Terminated">Terminated</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
