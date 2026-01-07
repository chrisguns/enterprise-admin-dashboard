import { Card, CardContent, Stack, Typography } from "@mui/material";

export default function PaymentsPage() {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h5" sx={{ fontWeight: 900 }}>
            Payments
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Daily totals, tips, and payouts coming next.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
