import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type { Employee, EmployeeStatus } from "../types/employee";
import {
  Box,
  Button,
  Chip,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import { useEmployeeTable } from "../hooks/useEmployeeTable";
import type { DepartmentFilter } from "../constants/employeeOptions";

interface EmployeeTableProps {
  employees: Employee[];
  searchTerm: string;
  department: DepartmentFilter | "All Departments";
  status: EmployeeStatus | "All Statuses";
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}
type StatusColor = "success" | "default" | "warning" | "error";

const statusColors: Record<EmployeeStatus, StatusColor> = {
  Active: "success",
  Inactive: "default",
  "On Leave": "warning",
  Terminated: "error",
};

export default function EmployeeTable({
  employees,
  searchTerm,
  department,
  status,
  onEdit,
  onDelete,
}: EmployeeTableProps) {
  const {
    sortField,
    sortDirection,
    handleSorted,
    currentPage,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    totalCount,
    paginatedEmployees,
  } = useEmployeeTable(employees, { searchTerm, department, status });

  //formatDate
  const formatDate = (date: string) => {
    if (!date) return "";

    const [year, month, day] = date.split("-");

    const customFormat = new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(Number(year), Number(month) - 1, Number(day)));
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
                  active={sortField === "fullName"}
                  direction={sortDirection}
                  onClick={() => handleSorted("fullName")}
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
            {totalCount === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No employees found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedEmployees.map((employee) => (
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
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => onEdit(employee)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => onDelete(employee.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalCount}
        page={currentPage}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Paper>
  );
}
