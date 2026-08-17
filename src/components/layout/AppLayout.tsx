import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

const drawerWidth = 250;

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenuClick = () => {
    setMobileOpen((previous) => !previous);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Header onMenuClick={handleMenuClick} />

      <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerClose} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            md: `calc(100% - ${drawerWidth}px)`,
          },
          bgcolor: "#F8FAFC",
          minHeight: "100vh",
        }}
      >
        <Toolbar />

        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
