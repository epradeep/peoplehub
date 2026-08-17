import {
  Dashboard,
  People,
  BeachAccess,
  // AccessTime,
  // Assessment,
  // Settings,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <Dashboard />,
  },
  {
    label: "Employees",
    path: "/employees",
    icon: <People />,
  },
  {
    label: "Leave",
    path: "/leave",
    icon: <BeachAccess />,
  },
  // {
  //   label: "Attendance",
  //   path: "/attendance",
  //   icon: <AccessTime />,
  // },
  // {
  //   label: "Reports",
  //   path: "/reports",
  //   icon: <Assessment />,
  // },
  // {
  //   label: "Settings",
  //   path: "/settings",
  //   icon: <Settings />,
  // },
];

const drawerWidth = 250;

function SidebarContent({ onClose }: { onClose?: () => void }) {
  return (
    <Box sx={{ height: "100%", bgcolor: "#111827", color: "white" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          PeopleHub
        </Typography>
      </Toolbar>

      <List sx={{ px: 1, paddingTop: 4 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            onClick={onClose}
            sx={{
              mb: 0.5,
              borderRadius: 2,
              color: "#D1D5DB",

              "&.active": {
                bgcolor: "#2563EB",
                color: "#FFFFFF",
              },

              "&:hover": {
                bgcolor: "#1F2937",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "inherit",
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            border: "none",
          },
        }}
        open={true}
      >
        <SidebarContent />
      </Drawer>

      {/* Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        <SidebarContent onClose={onClose} />
      </Drawer>
    </>
  );
}
