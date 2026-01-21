import * as React from "react"
import { useNavigate } from "@tanstack/react-router"
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material"
import { useSettings } from "../core/settings/SettingsProvider"

// Reusable building block you just added (TurboTax vibe)
import {
  BusinessHoursSelector,
  DEFAULT_BUSINESS_HOURS,
  type BusinessHoursValue,
} from "../features/onboarding/components/BusinessHoursSelector"


import UsTimezoneSelect from "../features/onboarding/components/UsTimeZoneSelect"

function toDisplayTime(hhmm: string) {
  const [hhStr, mmStr] = hhmm.split(":")
  const hh = Number(hhStr)
  const mm = Number(mmStr)
  const period = hh >= 12 ? "PM" : "AM"
  const h12 = hh % 12 === 0 ? 12 : hh % 12
  return `${h12}:${String(mm).padStart(2, "0")} ${period}`
}

function formatHoursHint(hours: BusinessHoursValue) {
  const order: (keyof BusinessHoursValue)[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
  const label: Record<string, string> = {
    mon: "Mon",
    tue: "Tue",
    wed: "Wed",
    thu: "Thu",
    fri: "Fri",
    sat: "Sat",
    sun: "Sun",
  }

  const enabled = order.filter((d) => hours[d].enabled)
  if (enabled.length === 0) return "No business hours set"

  const rangeOf = (d: keyof BusinessHoursValue) => `${hours[d].start}-${hours[d].end}`
  const allSame = (ds: (keyof BusinessHoursValue)[]) => ds.every((d) => rangeOf(d) === rangeOf(ds[0]))

  const weekdays: (keyof BusinessHoursValue)[] = ["mon", "tue", "wed", "thu", "fri"]
  const weekends: (keyof BusinessHoursValue)[] = ["sat", "sun"]

  const weekdayEnabled = weekdays.every((d) => hours[d].enabled)
  const weekendEnabled = weekends.every((d) => hours[d].enabled)

  const parts: string[] = []

  if (weekdayEnabled && allSame(weekdays)) {
    parts.push(
      `Mon–Fri ${toDisplayTime(hours.mon.start)}–${toDisplayTime(hours.mon.end)}`
    )
  } else {
    for (const d of weekdays) {
      if (!hours[d].enabled) continue
      parts.push(`${label[d]} ${toDisplayTime(hours[d].start)}–${toDisplayTime(hours[d].end)}`)
    }
  }

  if (weekendEnabled && allSame(weekends)) {
    parts.push(
      `Sat–Sun ${toDisplayTime(hours.sat.start)}–${toDisplayTime(hours.sat.end)}`
    )
  } else {
    for (const d of weekends) {
      if (!hours[d].enabled) continue
      parts.push(`${label[d]} ${toDisplayTime(hours[d].start)}–${toDisplayTime(hours[d].end)}`)
    }
  }

  return parts.join(" • ")
}

export default function OwnerOnboardingPage() {
  const navigate = useNavigate()
  const { settings, updateSettings, resetSettings } = useSettings()

  // Stepper (2 parts like you asked)
  const steps = ["Business basics", "Availability + appearance"]
  const [activeStep, setActiveStep] = React.useState(0)

  // Basics
  const [businessName, setBusinessName] = React.useState(settings.businessName || "Schedule")
  const [timezone, setTimezone] = React.useState(settings.timezone || "America/Chicago")

  // TurboTax-style hours
  const [businessHours, setBusinessHours] = React.useState<BusinessHoursValue>(
    () => DEFAULT_BUSINESS_HOURS
  )

  // Theme controls (persist to settings)
  const [mode, setMode] = React.useState<"light" | "dark">(settings.mode ?? "light")
  const [primaryColor, setPrimaryColor] = React.useState<string>(
    settings.primaryColor || "#1976d2"
  )

  const anyDayEnabled = React.useMemo(() => {
    const days = Object.keys(businessHours) as (keyof BusinessHoursValue)[]
    return days.some((d) => businessHours[d].enabled)
  }, [businessHours])

  const hoursValid = React.useMemo(() => {
    const days = Object.keys(businessHours) as (keyof BusinessHoursValue)[]
    const enabled = days.filter((d) => businessHours[d].enabled)
    if (enabled.length === 0) return false

    // "HH:MM" string compare works in 24h format
    return enabled.every((d) => businessHours[d].end > businessHours[d].start)
  }, [businessHours])

  const basicsValid = businessName.trim().length > 0 && timezone.trim().length > 0
  const step2Valid = anyDayEnabled && hoursValid && (mode === "light" || mode === "dark")

  const canNext = activeStep === 0 ? basicsValid : step2Valid

  const onNext = () => {
    if (!canNext) return
    setActiveStep((s) => Math.min(s + 1, steps.length - 1))
  }

  const onBack = () => setActiveStep((s) => Math.max(s - 1, 0))

  const onReset = () => {
    resetSettings()
    setActiveStep(0)
    setBusinessName("Schedule")
    setTimezone("America/Chicago")
    setBusinessHours(DEFAULT_BUSINESS_HOURS)
    setMode("light")
    setPrimaryColor("#1976d2")
  }

  const onFinish = () => {
    if (!basicsValid || !step2Valid) return

    updateSettings({
      businessName: businessName.trim() || "Schedule",
      timezone: timezone.trim() || "America/Chicago",

      // Keep string hint for now (until we add structured storage to SettingsProvider)
      hoursHint: formatHoursHint(businessHours),

      mode,
      primaryColor,

      onboardingComplete: true,
    })

    navigate({ to: "/schedule", replace: true })
  }

  return (
    <Box sx={{ maxWidth: 880, mx: "auto", p: { xs: 2, md: 3 } }}>
      <Card>
        <CardContent>
          <Stack spacing={2.5}>
            <Stack spacing={0.75}>
              <Typography variant="h5" sx={{ fontWeight: 900 }}>
                Set up your business
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Guided setup (TurboTax vibe): pick from clean options so your schedule defaults are right.
              </Typography>
            </Stack>

            <Stepper activeStep={activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Divider />

            {activeStep === 0 ? (
              <Stack spacing={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
                  Business basics
                </Typography>

                <TextField
                  label="Business name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  fullWidth
                />

                {/* US-only timezone dropdown (your reusable component) */}
                <UsTimezoneSelect value={timezone} onChange={setTimezone} />

                {!basicsValid && (
                  <Typography variant="caption" color="text.secondary">
                    Enter a business name and pick a timezone to continue.
                  </Typography>
                )}
              </Stack>
            ) : (
              <Stack spacing={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
                  Availability + appearance
                </Typography>

                {/* Reusable “TurboTax vibe” hours selector */}
                <BusinessHoursSelector value={businessHours} onChange={setBusinessHours} />

                <Typography variant="body2" color="text.secondary">
                  Preview: <strong>{formatHoursHint(businessHours)}</strong>
                </Typography>

                <Divider />

                <Stack spacing={1.25}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>
                    Appearance
                  </Typography>

                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.5}
                    alignItems={{ sm: "center" }}
                  >
                    <Stack spacing={0.75} sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>
                        Mode
                      </Typography>
                      <ToggleButtonGroup
                        value={mode}
                        exclusive
                        onChange={(_, v) => {
                          if (v === "light" || v === "dark") setMode(v)
                        }}
                        size="small"
                        aria-label="theme mode"
                      >
                        <ToggleButton value="light">Light</ToggleButton>
                        <ToggleButton value="dark">Dark</ToggleButton>
                      </ToggleButtonGroup>
                    </Stack>

                    {/* User-friendly color picker */}
                    <TextField
                      label="Primary color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      type="color"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        "& input": { height: 44, padding: 0.5, cursor: "pointer" },
                      }}
                    />
                  </Stack>

                  {!step2Valid && (
                    <Typography variant="caption" color="text.secondary">
                      Select at least one open day and make sure end time is after start time.
                    </Typography>
                  )}
                </Stack>
              </Stack>
            )}

            <Divider />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              justifyContent="space-between"
              alignItems={{ sm: "center" }}
            >
              <Button
                variant="text"
                onClick={onReset}
                sx={{ textTransform: "none", fontWeight: 800 }}
              >
                Reset
              </Button>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button
                  variant="outlined"
                  onClick={onBack}
                  disabled={activeStep === 0}
                  sx={{ textTransform: "none", fontWeight: 800 }}
                >
                  Back
                </Button>

                {activeStep === 0 ? (
                  <Button
                    variant="contained"
                    onClick={onNext}
                    disabled={!canNext}
                    sx={{ textTransform: "none", fontWeight: 900 }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={onFinish}
                    disabled={!basicsValid || !step2Valid}
                    sx={{ textTransform: "none", fontWeight: 900 }}
                  >
                    Finish setup
                  </Button>
                )}
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
