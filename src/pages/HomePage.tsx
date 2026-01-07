import { Stack, Typography, Button } from "@mui/material";

export default function HomePage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4">Enterprise Admin Dashboard</Typography>
      <Typography variant="body2" color="text.secondary">
        Day 1: TanStack Router + MUI is wired.
      </Typography>
      <Button variant="contained">MUI is working</Button>
    </Stack>
  );
}
