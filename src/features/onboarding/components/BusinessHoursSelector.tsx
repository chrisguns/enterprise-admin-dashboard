import * as React from "react"
import {
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material"
import type { SelectChangeEvent } from "@mui/material/Select"

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"

export type DayHours = {
  enabled: boolean
  start: string // "09:00"
  end: string   // "17:00"
}

export type BusinessHoursValue = Record<DayKey, DayHours>

const DAY_LABELS: Record<DayKey, string> = {
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
  sun: "Sun",
}

function pad2(n: number) {
  return n.toString().padStart(2, "0")
}

function toLabel24(value: string) {
  // "HH:MM" -> "h:mm AM/PM"
  const [hhStr, mmStr] = value.split(":")
  const hh = Number(hhStr)
  const mm = Number(mmStr)
  const ampm = hh >= 12 ? "PM" : "AM"
  const hour12 = hh % 12 === 0 ? 12 : hh % 12
  return `${hour12}:${mmStr} ${ampm}`
}

function buildTimeOptions(stepMinutes: number) {
  const out: string[] = []
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += stepMinutes) {
      out.push(`${pad2(h)}:${pad2(m)}`)
    }
  }
  return out
}

const TIME_OPTIONS = buildTimeOptions(30)

export const DEFAULT_BUSINESS_HOURS: BusinessHoursValue = {
  mon: { enabled: true, start: "09:00", end: "17:00" },
  tue: { enabled: true, start: "09:00", end: "17:00" },
  wed: { enabled: true, start: "09:00", end: "17:00" },
  thu: { enabled: true, start: "09:00", end: "17:00" },
  fri: { enabled: true, start: "09:00", end: "17:00" },
  sat: { enabled: false, start: "10:00", end: "14:00" },
  sun: { enabled: false, start: "10:00", end: "14:00" },
}

function minutesOf(value: string) {
  const [hh, mm] = value.split(":").map(Number)
  return hh * 60 + mm
}

function clampEndAfterStart(start: string, end: string) {
  // Ensure end is after start; if not, bump end to start + 60 min (if possible)
  const s = minutesOf(start)
  const e = minutesOf(end)
  if (e > s) return end
  const bumped = Math.min(s + 60, 23 * 60 + 30) // last option is 23:30
  const hh = Math.floor(bumped / 60)
  const mm = bumped % 60
  return `${pad2(hh)}:${pad2(mm)}`
}

export type BusinessHoursSelectorProps = {
  value: BusinessHoursValue
  onChange: (next: BusinessHoursValue) => void
  title?: string
  subtitle?: string
  disabled?: boolean
}

/**
 * TurboTax vibe:
 * - Days are "boxes" you click to activate
 * - When active, start/end dropdowns appear (simple, structured)
 */
export function BusinessHoursSelector({
  value,
  onChange,
  title = "Business hours",
  subtitle = "Select the days you’re open, then choose start and end times.",
  disabled,
}: BusinessHoursSelectorProps) {
  const enabledDays = React.useMemo(() => {
    return (Object.keys(DAY_LABELS) as DayKey[]).filter((d) => value[d].enabled)
  }, [value])

  const setDayEnabled = (day: DayKey, enabled: boolean) => {
    const current = value[day]
    const next: BusinessHoursValue = {
      ...value,
      [day]: {
        ...current,
        enabled,
      },
    }
    onChange(next)
  }

  const toggleDay = (_: React.MouseEvent<HTMLElement>, nextEnabledDays: DayKey[]) => {
    if (disabled) return

    const allDays = Object.keys(DAY_LABELS) as DayKey[]
    const next: BusinessHoursValue = { ...value }

    for (const day of allDays) {
      const shouldEnable = nextEnabledDays.includes(day)
      const cur = value[day]

      // keep times when toggling back on
      next[day] = { ...cur, enabled: shouldEnable }
    }

    onChange(next)
  }

  const setTime = (day: DayKey, field: "start" | "end", v: string) => {
    const cur = value[day]
    const nextDay: DayHours = {
      ...cur,
      [field]: v,
    }

    // keep it sane: end must be after start
    if (field === "start") {
      nextDay.end = clampEndAfterStart(v, cur.end)
    } else {
      nextDay.end = clampEndAfterStart(cur.start, v)
    }

    const next: BusinessHoursValue = {
      ...value,
      [day]: nextDay,
    }
    onChange(next)
  }

  const handleStartChange =
    (day: DayKey) =>
    (e: SelectChangeEvent<string>) => {
      setTime(day, "start", e.target.value)
    }

  const handleEndChange =
    (day: DayKey) =>
    (e: SelectChangeEvent<string>) => {
      setTime(day, "end", e.target.value)
    }

  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>

          {/* Day “boxes” */}
          <ToggleButtonGroup
            value={enabledDays}
            onChange={toggleDay}
            aria-label="Select business days"
            disabled={disabled}
            sx={{
              flexWrap: "wrap",
              gap: 1,
              "& .MuiToggleButtonGroup-grouped": {
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                px: 1.25,
                py: 0.75,
                minWidth: 56,
                textTransform: "none",
                fontWeight: 800,
              },
            }}
          >
            {(Object.keys(DAY_LABELS) as DayKey[]).map((day) => (
              <ToggleButton key={day} value={day} aria-label={DAY_LABELS[day]}>
                {DAY_LABELS[day]}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          {/* Per-day time pickers */}
          <Stack spacing={1.25}>
            {(Object.keys(DAY_LABELS) as DayKey[]).map((day) => {
              const d = value[day]
              if (!d.enabled) return null

              return (
                <Box
                  key={day}
                  sx={{
                    p: 1.25,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                  }}
                >
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.25}
                    alignItems={{ xs: "stretch", sm: "center" }}
                    justifyContent="space-between"
                  >
                    <Typography sx={{ fontWeight: 900, minWidth: 64 }}>
                      {DAY_LABELS[day]}
                    </Typography>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} flex={1}>
                      <FormControl size="small" fullWidth>
                        <InputLabel>Start</InputLabel>
                        <Select
                          label="Start"
                          value={d.start}
                          onChange={handleStartChange(day)}
                          disabled={disabled}
                        >
                          {TIME_OPTIONS.map((t) => (
                            <MenuItem key={t} value={t}>
                              {toLabel24(t)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl size="small" fullWidth>
                        <InputLabel>End</InputLabel>
                        <Select
                          label="End"
                          value={d.end}
                          onChange={handleEndChange(day)}
                          disabled={disabled}
                        >
                          {TIME_OPTIONS.map((t) => (
                            <MenuItem key={t} value={t}>
                              {toLabel24(t)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Stack>
                  </Stack>
                </Box>
              )
            })}

            {/* Empty state when no days selected */}
            {enabledDays.length === 0 ? (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: "1px dashed",
                  borderColor: "divider",
                  textAlign: "center",
                }}
              >
                <Typography sx={{ fontWeight: 900 }}>No days selected</Typography>
                <Typography variant="body2" color="text.secondary">
                  Click a day above to add hours.
                </Typography>
              </Box>
            ) : null}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default BusinessHoursSelector
