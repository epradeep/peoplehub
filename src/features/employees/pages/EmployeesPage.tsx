import {
  Alert,
  Box,
  Button,
  Snackbar,
  Typography,
  type SnackbarCloseReason,
} from "@mui/material";
import EmployeeTable from "../components/EmployeeTable";
import { mockEmployees } from "../data/mockEmployees";
import EmployeeToolbar from "../components/EmployeeToolbar";
import { useEffect, useState, type SyntheticEvent } from "react";
import type { Employee, EmployeeStatus } from "../types/employee";
import EmployeeForm from "../components/EmployeeForm";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import type { DepartmentFilter } from "../constants/employeeOptions";

const EMPLOYEES_STORAGE_KEY = "employeesData";
export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    try {
      const storedEmployees = localStorage.getItem(EMPLOYEES_STORAGE_KEY);
      if (!storedEmployees) {
        return mockEmployees;
      }

      const parsedEmployees: unknown = JSON.parse(storedEmployees);
      if (!Array.isArray(parsedEmployees)) {
        console.warn("Invalid employees data in localStorage.");
        return mockEmployees;
      }
      return parsedEmployees as Employee[];
    } catch (error) {
      console.error("Failed to parse employees from localStorage:", error);
      return mockEmployees;
    }
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<
    DepartmentFilter | "All Departments"
  >("All Departments");

  const [selectedStatus, setSelectedStatus] = useState<
    EmployeeStatus | "All Statuses"
  >("All Statuses");
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [openForm, setOpenForm] = useState(false);

  const [deleteEmployee, setDeleteEmployee] = useState<Employee | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(EMPLOYEES_STORAGE_KEY, JSON.stringify(employees));
    } catch (error) {
      console.error("Failed to save employees to localStorage", error);
    }
  }, [employees]);

  const handleClickOpen = () => {
    setEditEmployee(null);
    setOpenForm(true);
  };
  const handleClose = () => {
    setOpenForm(false);
    setEditEmployee(null);
  };

  //Add or Update employee
  const handleSubmitEmployee = (employee: Employee) => {
    if (editEmployee) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === employee.id ? employee : emp)),
      );
      setMessage("Employee updated successfully.");
      setOpenAlert(true);
    } else {
      setEmployees((prev) => {
        const nextNumber =
          prev.reduce((max, emp) => {
            const match = emp.employeeCode.match(/^EMP(\d+)$/);
            const number = match ? Number(match[1]) : 0;
            return Math.max(max, number);
          }, 0) + 1;

        const newEmployee: Employee = {
          ...employee,
          employeeCode: `EMP${String(nextNumber).padStart(3, "0")}`,
        };
        return [...prev, newEmployee];
      });
      setMessage("Employee added successfully.");
      setOpenAlert(true);
    }

    handleClose();
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditEmployee(employee);
    setOpenForm(true);
  };

  //delete employee
  const handleDeleteEmployee = (id: number) => {
    const employee = employees.find((emp) => emp.id === id);
    if (employee) {
      setDeleteEmployee(employee);
      setOpenDeleteDialog(true);
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteEmployee) {
      return;
    }
    setEmployees((prev) => prev.filter((emp) => emp.id !== deleteEmployee.id));
    setMessage("Employee deleted successfully.");
    setOpenAlert(true);
    setDeleteEmployee(null);
    setOpenDeleteDialog(false);
  };

  const handleCancelDelete = () => {
    setDeleteEmployee(null);
    setOpenDeleteDialog(false);
  };

  //alert messages
  const handleSnackbarClose = (
    event?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
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
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
      />
      <EmployeeForm
        open={openForm}
        onClose={handleClose}
        onSubmit={handleSubmitEmployee}
        editEmployee={editEmployee}
      />
      <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Delete Employee</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this employee?
          </Typography>
          <Typography sx={{ mt: 1, fontWeight: 600 }}>
            {deleteEmployee?.firstName} {deleteEmployee?.lastName}
          </Typography>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={handleCancelDelete}
              variant="outlined"
              color="inherit"
              size="small"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              color="error"
              size="small"
            >
              Delete
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      {/*Display alert meassage*/}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openAlert}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
