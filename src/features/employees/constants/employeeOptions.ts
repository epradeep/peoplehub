export const departments = [
  "Engineering",
  "HR",
  "Finance",
  "Sales",
  "Marketing",
] as const;

export type Department = (typeof departments)[number];

export type DepartmentFilter = Department | "All Departments";

export const designations = [
  "Senior React Developer",
  "HR Manager",
  "Financial Analyst",
  "Frontend Developer",
  "Sales Executive",
  "Marketing Specialist",
  "Backend Developer",
  "HR Executive",
  "Senior Accountant",
  "UI/UX Designer",
  "Sales Manager",
  "Content Strategist",
  "Full Stack Developer",
  "Recruitment Specialist",
  "Finance Manager",
  "QA Engineer",
  "Business Development Executive",
  "Digital Marketing Manager",
  "DevOps Engineer",
  "People Operations Specialist",
] as const;
