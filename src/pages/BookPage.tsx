import { Card, CardContent, Stack, Typography } from "@mui/material";
import { useSettings } from "../core/settings/SettingsProvider";

export default function BookPage() {
  const { settings } = useSettings();
  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h5" sx={{ fontWeight: 900 }}>
            Book an appointment
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Booking for: {settings.businessName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            (Tomorrow we build service picker → time slots → confirmation.)
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
