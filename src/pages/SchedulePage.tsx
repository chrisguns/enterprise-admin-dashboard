import { Card, CardContent, Stack, Typography } from "@mui/material";
import { useSettings } from "../core/settings/SettingsProvider";

export default function SchedulePage() {
  const { settings } = useSettings();

  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h5" sx={{ fontWeight: 900 }}>
            Schedule
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {settings.businessName} — owner dashboard
          </Typography>

          <Typography variant="body2" color="text.secondary">
            (Today: route protection + app shell. Tomorrow: real calendar + availability.)
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
