import { Card, CardContent, Stack, Typography } from "@mui/material";

export default function ServicesPage() {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h5" sx={{ fontWeight: 900 }}>
            Services
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Service catalog, pricing, and durations coming next.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
