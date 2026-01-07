import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PaymentsIcon from "@mui/icons-material/Payments";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddIcon from "@mui/icons-material/Add";

function StatCard(props: {
  title: string;
  value: string;
  delta: string;
  icon: React.ReactNode;
}) {
  const { title, value, delta, icon } = props;

  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>

            <Typography variant="h5" sx={{ mt: 0.5, fontWeight: 800 }}>
              {value}
            </Typography>

            <Chip
              size="small"
              label={delta}
              sx={{ mt: 1, fontWeight: 700 }}
              color="primary"
              variant="outlined"
            />
          </Box>

          <Paper
            sx={{
              p: 1,
              borderRadius: 3,
              border: "1px solid rgba(0,0,0,0.06)",
              bgcolor: "background.paper",
            }}
          >
            {icon}
          </Paper>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      {/* Hero */}
      <Paper
        sx={{
          p: { xs: 3, md: 4 },
          mb: 3,
          border: "1px solid rgba(0,0,0,0.06)",
          background:
            "linear-gradient(135deg, rgba(30,94,255,0.10), rgba(110,89,249,0.08))",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
        >
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                size="small"
                color="secondary"
                variant="outlined"
                label="Stylist dashboard"
                sx={{ fontWeight: 800 }}
              />
              <Chip
                size="small"
                variant="outlined"
                label="Scheduling • Clients • Services • Payments"
                sx={{ fontWeight: 700 }}
              />
            </Stack>

            <Typography variant="h3" sx={{ mt: 1 }}>
              Salon Schedule
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 1, maxWidth: 720 }}
            >
              Manage today’s appointments, client notes, services, and totals—built like a
              real scheduling product.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5}>
            <Button startIcon={<AddIcon />} variant="contained">
              New Appointment
            </Button>
            <Button endIcon={<ArrowForwardIcon />} variant="outlined">
              View Schedule
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {/* Stats */}
      <Box
        sx={{
          display: "grid",
          gap: 2,
          mb: 3,
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
        }}
      >
        <StatCard
          title="Appointments Today"
          value="7"
          delta="2 remaining"
          icon={<CalendarMonthIcon fontSize="medium" />}
        />
        <StatCard
          title="Clients This Week"
          value="24"
          delta="+4 new"
          icon={<PeopleAltIcon fontSize="medium" />}
        />
        <StatCard
          title="Revenue Today"
          value="$640"
          delta="+$120 vs avg"
          icon={<PaymentsIcon fontSize="medium" />}
        />
      </Box>

      {/* Today */}
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6">Today’s schedule</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Upcoming appointments with service + time.
              </Typography>
            </Box>
            <Button variant="text" endIcon={<ArrowForwardIcon />}>
              Open calendar
            </Button>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={1.5}>
            {[
              { time: "10:00 AM", name: "Jasmine R.", service: "Silk press + trim", meta: "90 min • $120" },
              { time: "12:00 PM", name: "Keisha T.", service: "Knotless braids", meta: "3 hrs • $220" },
              { time: "3:30 PM", name: "Ari M.", service: "Color refresh", meta: "60 min • $95" },
            ].map((appt) => (
              <Paper
                key={`${appt.time}-${appt.name}`}
                sx={{
                  p: 2,
                  border: "1px solid rgba(0,0,0,0.06)",
                  bgcolor: "background.paper",
                }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", sm: "center" }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 900 }}>
                      {appt.time} • {appt.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {appt.service} — {appt.meta}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1}>
                    <Button size="small" variant="outlined">
                      Client
                    </Button>
                    <Button size="small" variant="contained">
                      Check-in
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Box sx={{ height: 24 }} />
    </Container>
  );
}
