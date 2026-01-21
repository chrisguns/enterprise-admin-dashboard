import * as React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

/**
 * US-only IANA time zones
 * (Explicit list keeps UX simple and predictable)
 */
export const US_TIMEZONES = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Phoenix", label: "Arizona (MT – no DST)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "America/Anchorage", label: "Alaska Time (AKT)" },
  { value: "Pacific/Honolulu", label: "Hawaii Time (HST)" },
];

function detectUserTimezone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const match = US_TIMEZONES.find((z) => z.value === tz);
    return match ? match.value : "America/Chicago";
  } catch {
    return "America/Chicago";
  }
}

type Props = {
  value?: string;
  onChange: (tz: string) => void;
  label?: string;
  helperText?: string;
};

export default function UsTimezoneSelect({
  value,
  onChange,
  label = "Timezone",
  helperText = "We’ll use this for bookings and reminders.",
}: Props) {
  const [internalValue, setInternalValue] = React.useState<string>(
    value ?? detectUserTimezone()
  );

  // Sync upward on mount if parent didn't set it
  React.useEffect(() => {
    if (!value) onChange(internalValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: SelectChangeEvent<string>) => {
    const next = e.target.value;
    setInternalValue(next);
    onChange(next);
  };

  return (
    <Stack spacing={0.5}>
      <FormControl fullWidth>
        <InputLabel id="timezone-label">{label}</InputLabel>
        <Select
          labelId="timezone-label"
          label={label}
          value={internalValue}
          onChange={handleChange}
        >
          {US_TIMEZONES.map((tz) => (
            <MenuItem key={tz.value} value={tz.value}>
              {tz.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="caption" color="text.secondary">
        {helperText}
      </Typography>
    </Stack>
  );
}
