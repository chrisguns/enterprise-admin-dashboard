import * as React from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Link as RouterLink } from "@tanstack/react-router";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";

const TanstackLinkBehavior = React.forwardRef<
    HTMLAnchorElement,
    Omit<React.ComponentProps<typeof RouterLink>, "to"> & { to: string }
>(function TanstackLinkBehavior(props, ref) {
    const { to, ...other } = props;
    return <RouterLink ref={ref} to={to} {...other} />;
});

const drawerWidth = 240;

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        <Toolbar />
        <List>
          <ListItemButton component={TanstackLinkBehavior} to="/schedule">
            <ListItemText primary="Schedule" />
          </ListItemButton>
          <ListItemButton component={TanstackLinkBehavior} to="/clients">
            <ListItemText primary="Clients" />
          </ListItemButton>
          <ListItemButton component={TanstackLinkBehavior} to="/settings">
            <ListItemText primary="Settings" />
          </ListItemButton>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
