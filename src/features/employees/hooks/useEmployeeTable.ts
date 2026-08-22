import { useEffect, useState } from "react";
import type { Employee, EmployeeStatus } from "../types/employee";

type SortField = "fullName" | "joiningDate";
interface EmployeeFilters {
  searchTerm: string;
  department: string;
  status: EmployeeStatus | "All Statuses";
}

export function useEmployeeTable(
  employees: Employee[],
  {
    searchTerm,
    department: selectedDepartment,
    status: selectedStatus,
  }: EmployeeFilters,
) {
  const [sortField, setSortField] = useState<SortField>("fullName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const search = searchTerm.toLowerCase().trim();
  const filteredEmployees = employees.filter(
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

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, selectedDepartment, selectedStatus]);

  const handleSorted = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(0);
  };

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    let comparison = 0;
    if (sortField === "fullName") {
      //   comparison = a.firstName.localeCompare(b.firstName);
      const nameA = `${a.firstName} ${a.lastName}`;
      const nameB = `${b.firstName} ${b.lastName}`;

      comparison = nameA.localeCompare(nameB);
    } else if (sortField === "joiningDate") {
      comparison =
        new Date(a.joiningDate).getTime() - new Date(b.joiningDate).getTime();
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  //total employees
  const totalCount = sortedEmployees.length;

  const pageCount = Math.ceil(totalCount / rowsPerPage);
  useEffect(() => {
    if (pageCount === 0) {
      setCurrentPage(0);
    } else if (currentPage >= pageCount) {
      setCurrentPage(pageCount - 1);
    }
  }, [currentPage, pageCount]);

  //pagination
  const paginatedEmployees = sortedEmployees.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage,
  );

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return {
    sortField,
    sortDirection,
    handleSorted,
    currentPage,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    totalCount,
    paginatedEmployees,
  };
}
