import { Card, CardContent, Stack, Typography } from "@mui/material";

export default function ClientsPage() {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h5" sx={{ fontWeight: 900 }}>
            Clients
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Client list + notes + visit history coming next.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
