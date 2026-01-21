import * as React from "react"
import { useNavigate } from "@tanstack/react-router"
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { useSettings } from "../core/settings/SettingsProvider"

export default function OwnerOnboardingPage() {
  const navigate = useNavigate()
  const { settings, updateSettings, resetSettings } = useSettings()

  const [businessName, setBusinessName] = React.useState(settings.businessName)
  const [timezone, setTimezone] = React.useState(settings.timezone)
  const [hoursHint, setHoursHint] = React.useState(settings.hoursHint)

  const onContinue = () => {
    updateSettings({
      businessName: businessName.trim() || "Schedule",
      timezone: timezone.trim() || "America/Chicago",
      hoursHint: hoursHint.trim() || "Mon–Fri 9:00 AM–6:00 PM",
      onboardingComplete: true,
    })

    navigate({ to: "/schedule", replace: true })
  }

  return (
    <Box sx={{ maxWidth: 760, mx: "auto", p: { xs: 2, md: 3 } }}>
      <Card>
        <CardContent>
          <Stack spacing={2.25}>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>
              Set up your business
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Quick setup — we’ll use this to power your scheduling defaults.
            </Typography>

            <TextField
              label="Business name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              fullWidth
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <TextField
                label="Timezone"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                fullWidth
              />
              <TextField
                label="Business hours (hint)"
                value={hoursHint}
                onChange={(e) => setHoursHint(e.target.value)}
                fullWidth
              />
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              justifyContent="flex-end"
              pt={1}
            >
              <Button
                variant="text"
                onClick={resetSettings}
                sx={{ textTransform: "none", fontWeight: 800 }}
              >
                Reset
              </Button>

              <Button
                variant="contained"
                onClick={onContinue}
                sx={{ textTransform: "none", fontWeight: 800 }}
              >
                Continue
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
