import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import type { Employee } from "../types/employee";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface EmployeeFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (newEmployee: Employee) => void;
}

type EmployeeFormData = Omit<Employee, "id" | "employeeCode">;

const initialFormData: EmployeeFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  department: "",
  designation: "",
  joiningDate: "",
  status: "Active",
};

export default function EmployeeForm({
  open,
  onClose,
  onSubmit,
}: EmployeeFormProps) {
  const [formData, setFormData] = useState<EmployeeFormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //form submission
  const handleSubmit = () => {
    const newEmployee: Employee = {
      id: Date.now(),
      employeeCode: "",
      ...formData,
    };
    onSubmit(newEmployee);
    setFormData(initialFormData);
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="employee-dialog-title"
      open={open}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="employee-dialog-title">
        Add Employee
      </DialogTitle>

      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        <Box component="section">
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                disabled
                id="employee-code"
                label="Employee Code"
                value="Auto-generated"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="first-name"
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="last-name"
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="department-label">Department</InputLabel>

                <Select
                  labelId="department-label"
                  id="department"
                  name="department"
                  label="Department"
                  value={formData.department}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="">
                    <em>Select Department</em>
                  </MenuItem>
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="designation-label">Designation</InputLabel>

                <Select
                  labelId="designation-label"
                  id="designation"
                  name="designation"
                  label="Designation"
                  value={formData.designation}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="">
                    <em>Select Designation</em>
                  </MenuItem>

                  <MenuItem value="Senior React Developer">
                    Senior React Developer
                  </MenuItem>
                  <MenuItem value="HR Manager">HR Manager</MenuItem>
                  <MenuItem value="Financial Analyst">
                    Financial Analyst
                  </MenuItem>
                  <MenuItem value="Sales Executive">Sales Executive</MenuItem>
                  <MenuItem value="Marketing Specialist">
                    Marketing Specialist
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="joining-date"
                name="joiningDate"
                label="Joining Date"
                type="date"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                value={formData.joiningDate}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>

                <Select
                  labelId="status-label"
                  id="status"
                  name="status"
                  label="Status"
                  value={formData.status}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="On Leave">On Leave</MenuItem>
                  <MenuItem value="Terminated">Terminated</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>

        <Button variant="contained" onClick={handleSubmit}>
          Add Employee
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
