import { AccountCircle, Menu } from "@mui/icons-material";

import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "#FFFFFF",
        color: "#111827",
        borderBottom: "1px solid #E5E7EB",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          onClick={onMenuClick}
          sx={{
            display: { md: "none" },
            mr: 1,
          }}
        >
          <Menu />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
          PeopleHub
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            ml: 2,
            gap: 1,
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: "#2563EB",
            }}
          >
            RK
          </Avatar>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Rahul Kumar
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Administrator
            </Typography>
          </Box>

          <AccountCircle sx={{ color: "text.secondary" }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
