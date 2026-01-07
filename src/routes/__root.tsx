import * as React from "react";
import { createRootRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import TodayIcon from "@mui/icons-material/Today";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import PaymentsIcon from "@mui/icons-material/Payments";

const drawerWidth = 260;

const navItems = [
  { label: "Today", to: "/", icon: <TodayIcon /> },
  // We'll create these routes next (Day 2)
  { label: "Schedule", to: "/schedule", icon: <CalendarMonthIcon /> },
  { label: "Clients", to: "/clients", icon: <PeopleAltIcon /> },
  { label: "Services", to: "/services", icon: <ContentCutIcon /> },
  { label: "Payments", to: "/payments", icon: <PaymentsIcon /> },
];

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const pageTitle =
    navItems.find((n) => n.to === pathname)?.label ??
    (pathname === "/" ? "Today" : "Dashboard");

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  const drawer = (
    <Box>
      <Toolbar sx={{ px: 2 }}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Salon Dashboard
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.1 }}>
            Stylist Studio
          </Typography>
        </Box>
      </Toolbar>

      <Divider />

      <List sx={{ px: 1, py: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.to}
            component={Link}
            to={item.to}
            onClick={closeMobile}
            selected={pathname === item.to}
            sx={{
              borderRadius: 2,
              mx: 1,
              my: 0.5,
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Top App Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          bgcolor: "background.paper",
          color: "text.primary",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
            aria-label="open navigation"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            {pageTitle}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Typography variant="body2" color="text.secondary">
            Next appt: 12:00 PM
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Left Nav - Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        {drawer}
      </Drawer>

      {/* Left Nav - Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid rgba(0,0,0,0.08)",
          },
        }}
        open
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: "background.default",
        }}
      >
        {/* spacer so content sits below AppBar */}
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
});
