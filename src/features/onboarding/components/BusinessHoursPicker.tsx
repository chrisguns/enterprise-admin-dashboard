// src/features/onboarding/components/BusinessHoursPicker.tsx
import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type DayHours = {
  active: boolean;
  start: string; // "09:00"
  end: string; // "17:00"
};

export type BusinessHoursValue = Record<DayKey, DayHours>;

const DAYS: Array<{ key: DayKey; label: string }> = [
  { key: "mon", label: "Mon" },
  { key: "tue", label: "Tue" },
  { key: "wed", label: "Wed" },
  { key: "thu", label: "Thu" },
  { key: "fri", label: "Fri" },
  { key: "sat", label: "Sat" },
  { key: "sun", label: "Sun" },
];

function pad2(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function buildTimeOptions(stepMinutes = 30) {
  const options: Array<{ value: string; label: string }> = [];

  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += stepMinutes) {
      const value = `${pad2(h)}:${pad2(m)}`;

      const hour12 = ((h + 11) % 12) + 1;
      const ampm = h < 12 ? "AM" : "PM";
      const label = `${hour12}:${pad2(m)} ${ampm}`;

      options.push({ value, label });
    }
  }

  return options;
}

const TIME_OPTIONS = buildTimeOptions(30);

export function createDefaultBusinessHours(): BusinessHoursValue {
  // “normal” defaults, easy to tweak later
  const weekday: DayHours = { active: true, start: "09:00", end: "17:00" };
  const weekend: DayHours = { active: false, start: "09:00", end: "17:00" };

  return {
    mon: { ...weekday },
    tue: { ...weekday },
    wed: { ...weekday },
    thu: { ...weekday },
    fri: { ...weekday },
    sat: { ...weekend },
    sun: { ...weekend },
  };
}

function compareTime(a: string, b: string) {
  // "HH:mm" string comparison works lexicographically
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

function clampEndAfterStart(start: string, end: string) {
  // If end <= start, bump end to next slot (or keep as-is if already last slot)
  if (compareTime(end, start) === 1) return end;

  const startIndex = TIME_OPTIONS.findIndex((o) => o.value === start);
  if (startIndex === -1) return end;

  const next = TIME_OPTIONS[Math.min(startIndex + 1, TIME_OPTIONS.length - 1)];
  return next.value;
}

type Props = {
  value: BusinessHoursValue;
  onChange: (next: BusinessHoursValue) => void;
  title?: string;
  helperText?: string;
};

export default function BusinessHoursPicker({
  value,
  onChange,
  title = "Business hours",
  helperText = "Pick the days you’re open, then choose your start and end time.",
}: Props) {
  const [activeDay, setActiveDay] = React.useState<DayKey>("mon");

  const day = value[activeDay];

  const toggleDay = (key: DayKey) => {
    const next: BusinessHoursValue = {
      ...value,
      [key]: {
        ...value[key],
        active: !value[key].active,
      },
    };
    onChange(next);

    // If you toggle on a day, jump into it (TurboTax-ish)
    if (!value[key].active) setActiveDay(key);
  };

  const setDayStart = (e: SelectChangeEvent<string>) => {
    const nextStart = e.target.value;
    const nextEnd = clampEndAfterStart(nextStart, value[activeDay].end);

    onChange({
      ...value,
      [activeDay]: {
        ...value[activeDay],
        start: nextStart,
        end: nextEnd,
      },
    });
  };

  const setDayEnd = (e: SelectChangeEvent<string>) => {
    const nextEnd = e.target.value;

    onChange({
      ...value,
      [activeDay]: {
        ...value[activeDay],
        end: clampEndAfterStart(value[activeDay].start, nextEnd),
      },
    });
  };

  const activeSummary = React.useMemo(() => {
    const active = DAYS.filter((d) => value[d.key].active);
    if (active.length === 0) return "Closed every day";
    if (active.length === 7) return "Open every day";
    return `Open: ${active.map((d) => d.label).join(", ")}`;
  }, [value]);

  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack spacing={1.25}>
          <Stack spacing={0.25}>
            <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {helperText}
            </Typography>
          </Stack>

          <Divider sx={{ my: 0.5 }} />

          {/* Day “boxes” (chips) */}
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {DAYS.map((d) => {
              const isActive = value[d.key].active;
              const isSelected = activeDay === d.key;

              return (
                <Chip
                  key={d.key}
                  label={d.label}
                  variant={isActive ? "filled" : "outlined"}
                  color={isSelected ? "primary" : "default"}
                  onClick={() => setActiveDay(d.key)}
                  onDelete={() => toggleDay(d.key)}
                  deleteIcon={
                    // little affordance: delete icon becomes the “toggle” gesture
                    <span style={{ fontWeight: 900 }}>
                      {isActive ? "✓" : "+"}
                    </span>
                  }
                  sx={{
                    borderRadius: 2,
                    fontWeight: 800,
                    "& .MuiChip-deleteIcon": { opacity: 0.9 },
                  }}
                />
              );
            })}
          </Stack>

          <Typography variant="caption" color="text.secondary">
            Tip: click a day to edit it. Click the ✓ / + to toggle open/closed.
          </Typography>

          <Box sx={{ pt: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 800, mb: 1 }}>
              {DAYS.find((d) => d.key === activeDay)?.label}{" "}
              {day.active ? "hours" : "(closed)"}
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <FormControl fullWidth disabled={!day.active}>
                <InputLabel id="start-label">Start</InputLabel>
                <Select
                  labelId="start-label"
                  label="Start"
                  value={day.start}
                  onChange={setDayStart}
                >
                  {TIME_OPTIONS.map((o) => (
                    <MenuItem key={o.value} value={o.value}>
                      {o.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth disabled={!day.active}>
                <InputLabel id="end-label">End</InputLabel>
                <Select
                  labelId="end-label"
                  label="End"
                  value={day.end}
                  onChange={setDayEnd}
                >
                  {TIME_OPTIONS.map((o) => (
                    <MenuItem key={o.value} value={o.value}>
                      {o.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  End time must be after start time.
                </FormHelperText>
              </FormControl>
            </Stack>
          </Box>

          <Divider sx={{ my: 0.5 }} />

          <Typography variant="body2" color="text.secondary">
            {activeSummary}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
