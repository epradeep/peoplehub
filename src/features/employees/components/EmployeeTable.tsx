import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type { Employee, EmployeeStatus } from "../types/employee";
import { Box, Button, Chip, TableSortLabel } from "@mui/material";
import { useState } from "react";

interface EmployeeTableProps {
  employees: Employee[];
}
type StatusColor = "success" | "default" | "warning" | "error";

const statusColors: Record<EmployeeStatus, StatusColor> = {
  Active: "success",
  Inactive: "default",
  "On Leave": "warning",
  Terminated: "error",
};

type SortField = "firstName" | "joiningDate";

export default function EmployeeTable({ employees }: EmployeeTableProps) {
  const [sortField, setSortField] = useState<SortField>("firstName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSorted = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    let comparison = 0;
    if (sortField === "firstName") {
      comparison = a.firstName.localeCompare(b.firstName);
    } else if (sortField === "joiningDate") {
      comparison =
        new Date(a.joiningDate).getTime() - new Date(b.joiningDate).getTime();
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const formatDate = (date: string) => {
    const current = new Date(date);
    const customFormat = new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(current);
    return customFormat;
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ overflowX: "auto", maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead
            sx={{
              "& .MuiTableCell-root": {
                fontWeight: 700,
              },
            }}
          >
            <TableRow>
              <TableCell align="left">Employee Code</TableCell>
              <TableCell align="left">
                <TableSortLabel
                  active={sortField === "firstName"}
                  direction={sortDirection}
                  onClick={() => handleSorted("firstName")}
                >
                  Employee Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Department</TableCell>
              <TableCell align="left">Designation</TableCell>
              <TableCell align="left">
                <TableSortLabel
                  active={sortField === "joiningDate"}
                  direction={sortDirection}
                  onClick={() => handleSorted("joiningDate")}
                >
                  Joining Date
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No employees found.
                </TableCell>
              </TableRow>
            ) : (
              sortedEmployees.map((employee) => (
                <TableRow
                  key={employee.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {employee.employeeCode}
                  </TableCell>
                  <TableCell align="left">{`${employee.firstName} ${employee.lastName}`}</TableCell>
                  <TableCell align="left">{employee.email}</TableCell>
                  <TableCell align="left">{employee.department}</TableCell>
                  <TableCell align="left">{employee.designation}</TableCell>
                  <TableCell align="left">
                    {formatDate(employee.joiningDate)}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={employee.status}
                      color={statusColors[employee.status]}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                    >
                      <Button variant="outlined" size="small">
                        View
                      </Button>
                      <Button variant="contained" size="small">
                        Edit
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
