import { Card, CardContent, Stack, Typography } from "@mui/material";

export default function SchedulePage() {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h5" sx={{ fontWeight: 900 }}>
            Schedule
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Week/day calendar view coming next.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
