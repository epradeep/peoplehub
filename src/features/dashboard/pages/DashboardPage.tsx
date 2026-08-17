import { Card, CardContent, Grid, Typography } from "@mui/material";

const statistics = [
  {
    title: "Total Employees",
    value: "248",
    color: "#2563EB",
  },
  {
    title: "Active Employees",
    value: "231",
    color: "#16A34A",
  },
  {
    title: "On Leave",
    value: "17",
    color: "#F59E0B",
  },
  {
    title: "Departments",
    value: "12",
    color: "#7C3AED",
  },
];

export default function DashboardPage() {
  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
        Dashboard
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Welcome back, Rahul. Here's what's happening today.
      </Typography>

      <Grid container spacing={3}>
        {statistics.map((item) => (
          <Grid
            key={item.title}
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent>
                <Typography color="text.secondary" variant="body2">
                  {item.title}
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    mt: 1,
                    color: item.color,
                    fontWeight: 700,
                  }}
                >
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
