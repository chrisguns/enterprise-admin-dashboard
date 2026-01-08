import * as React from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import PaletteRoundedIcon from "@mui/icons-material/PaletteRounded"

export const Route = createFileRoute("/_public/")({
  component: SplashPage,
})

export default function SplashPage() {
  // ---- Shared “iOS glass” tokens (keep consistent everywhere) ----
  const glassSurface = {
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)",
    backdropFilter: "blur(22px) saturate(175%)",
    WebkitBackdropFilter: "blur(22px) saturate(175%)",
    border: "1px solid rgba(255,255,255,0.16)",
    boxShadow:
      "0 40px 120px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.20)",
  } as const

  const glassPill = {
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))",
    backdropFilter: "blur(18px) saturate(175%)",
    WebkitBackdropFilter: "blur(18px) saturate(175%)",
    border: "1px solid rgba(255,255,255,0.16)",
    boxShadow:
      "0 18px 45px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.22)",
  } as const

  const glassButton = {
    textTransform: "none",
    fontWeight: 800,
    borderRadius: 999,
    px: 2.5,
    py: 1.1,
    ...glassPill,
    color: "rgba(255,255,255,0.92)",
    "&:hover": {
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.08))",
      border: "1px solid rgba(255,255,255,0.24)",
    },
  } as const

  // Near-transparent glass “bubble” used for ALL icon containers on splash
  const glassIcon = (tone: "blue" | "red" | "green") => {
    const toneMap = {
      blue: { ring: "rgba(58,111,234,0.22)", icon: "#3A6FEA" },
      red: { ring: "rgba(214,69,69,0.22)", icon: "#D64545" },
      green: { ring: "rgba(47,158,111,0.22)", icon: "#2F9E6F" },
    } as const
  
    const t = toneMap[tone]
  
    return {
      width: 69,
      height: 52,
      borderRadius: 999,
      display: "grid",
      placeItems: "center",
  
      // ✅ near-transparent glass (not white)
      background: "rgba(255,255,255,0.10)",
  
      // ✅ stronger blur makes it read as glass vs paint
      backdropFilter: "blur(26px) saturate(180%)",
      WebkitBackdropFilter: "blur(26px) saturate(180%)",
  
      // ✅ subtle ring + top highlight like iOS
      border: `1px solid ${t.ring}`,
      boxShadow: `
        0 10px 26px rgba(0,0,0,0.22),
        inset 0 1px 0 rgba(255,255,255,0.55),
        inset 0 -1px 0 rgba(0,0,0,0.18)
      `,
  
      color: t.icon,
    } as const
  }
  
  

  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
        // premium dark + subtle pastel bleed
        background: `
          radial-gradient(900px 500px at 50% -15%, rgba(180,210,255,0.28), transparent 60%),
          radial-gradient(600px 420px at 85% 28%, rgba(255,170,170,0.16), transparent 58%),
          radial-gradient(650px 420px at 10% 70%, rgba(160,235,200,0.12), transparent 60%),
          linear-gradient(180deg, #070B12 0%, #0A1120 50%, #060A12 100%)
        `,
      }}
    >
      {/* Top bar */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={1.25} alignItems="center">
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: 999,
                bgcolor: "rgba(255,255,255,0.85)",
                boxShadow: "0 0 0 6px rgba(255,255,255,0.08)",
              }}
            />
            <Typography sx={{ fontWeight: 900, letterSpacing: 0.2 }}>
              Schedule
            </Typography>

            <Chip
              label="Appointments • Clients • Payments"
              size="small"
              sx={{
                ml: 1,
                ...glassPill,
                color: "rgba(255,255,255,0.78)",
                "& .MuiChip-label": { fontWeight: 700 },
              }}
            />
          </Stack>

          <Button
            component={Link}
            to="/login"
            sx={{
              ...glassButton,
              px: 2,
              py: 0.9,
              fontWeight: 800,
              color: "rgba(255,255,255,0.86)",
            }}
          >
            Sign in
          </Button>
        </Stack>
      </Container>

      {/* Main */}
      <Container
        maxWidth="xl"
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          py: { xs: 4, md: 7 },
        }}
      >
        {/* Wide hero glass panel */}
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 1320,
            mx: "auto",
            borderRadius: 6,
            p: { xs: 3, sm: 4, md: 6 },
            ...glassSurface,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* subtle sheen */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04) 42%, transparent 65%)",
              pointerEvents: "none",
            }}
          />

          <Stack spacing={3} sx={{ position: "relative" }}>
            {/* Badges */}
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip
                size="small"
                label="Modern scheduling"
                sx={{
                  ...glassPill,
                  color: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(150,190,255,0.22)",
                  "& .MuiChip-label": { fontWeight: 800 },
                }}
              />
              <Chip
                size="small"
                label="Universal for any service business"
                sx={{
                  ...glassPill,
                  color: "rgba(255,255,255,0.78)",
                  "& .MuiChip-label": { fontWeight: 800 },
                }}
              />
            </Stack>

            {/* Headline */}
            <Box>
              <Typography
                sx={{
                  fontWeight: 950,
                  letterSpacing: -1.0,
                  lineHeight: 1.02,
                  fontSize: { xs: 44, sm: 60, md: 76 },
                }}
              >
                Schedule clients.
                <br />
                Run your business.
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  maxWidth: 860,
                  color: "rgba(234,242,255,0.80)",
                  fontSize: { xs: 15, sm: 16, md: 18 },
                  lineHeight: 1.6,
                }}
              >
                A modern booking experience for professionals who work by appointment —
                stylists, therapists, coaches, consultants, and more.
              </Typography>
            </Box>

            {/* CTAs */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              alignItems={{ xs: "stretch", sm: "center" }}
            >
              <Button
                component={Link}
                to="/book"
                sx={{
                  ...glassButton,
                  // a slightly brighter call-to-action
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.08))",
                  border: "1px solid rgba(255,255,255,0.22)",
                }}
              >
                Book an appointment
              </Button>

              <Button
                component={Link}
                to="/schedule"
                sx={{
                  ...glassButton,
                }}
              >
                View availability
              </Button>

              <Button
                component={Link}
                to="/login"
                sx={{
                  ...glassButton,
                  bgcolor: "transparent",
                  background: "transparent",
                  boxShadow: "none",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(180,210,255,0.92)",
                  "&:hover": {
                    background: "rgba(180,210,255,0.08)",
                    border: "1px solid rgba(180,210,255,0.22)",
                  },
                }}
              >
                I’m a business owner →
              </Button>
            </Stack>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.10)" }} />

            {/* Feature cards */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={3}
              sx={{ pt: 0.5 }}
            >
              <FeatureCard
                icon={<CalendarMonthRoundedIcon sx={{ fontSize: 30 }} />}
                tone="green"
                title="Fast booking"
                desc="A clean, mobile-first flow that clients understand instantly."
                glassIcon={glassIcon}
              />
              <FeatureCard
                icon={<AccessTimeRoundedIcon sx={{ fontSize: 30 }} />}
                tone="red"
                title="Business hours"
                desc="Availability, breaks, buffers, and scheduling rules with full control."
                glassIcon={glassIcon}
              />
              <FeatureCard
                icon={<PaletteRoundedIcon sx={{ fontSize: 30 }} />}
                tone="blue"
                title="Light branding"
                desc="Subtle theme accents so each business feels like their own."
                glassIcon={glassIcon}
              />
            </Stack>
          </Stack>
        </Paper>
      </Container>

      {/* Footer */}
      <Container maxWidth="xl" sx={{ pb: 3, pt: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography sx={{ color: "rgba(234,242,255,0.55)", fontSize: 12 }}>
            © 2026 Schedule
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              component={Link}
              to="/privacy"
              sx={{
                textTransform: "none",
                fontSize: 12,
                color: "rgba(234,242,255,0.55)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
              }}
            >
              Privacy
            </Button>
            <Button
              component={Link}
              to="/terms"
              sx={{
                textTransform: "none",
                fontSize: 12,
                color: "rgba(234,242,255,0.55)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
              }}
            >
              Terms
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

function FeatureCard({
    icon,
    title,
    desc,
    tone,
    glassIcon,
  }: {
    icon: React.ReactNode
    title: string
    desc: string
    tone: "blue" | "red" | "green"
    glassIcon: (tone: "blue" | "red" | "green") => Record<string, unknown>
  }) {
    return (
      <Paper
        elevation={0}
        sx={{
          flex: 1,
          borderRadius: 4,
          p: 3,
          minHeight: 140,
  
          /* White frosted glass */
          background: "rgba(255,255,255,0.62)",
          backdropFilter: "blur(26px) saturate(180%)",
          WebkitBackdropFilter: "blur(26px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.75)",
  
          boxShadow: `
            0 28px 60px rgba(0,0,0,0.28),
            inset 0 1px 0 rgba(255,255,255,0.85)
          `,
  
          position: "relative",
          overflow: "hidden",
  
          transition: "transform 200ms ease, box-shadow 200ms ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 36px 80px rgba(0,0,0,0.35)",
          },
        }}
      >
        {/* very subtle top sheen */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0.05) 40%, transparent)",
            pointerEvents: "none",
          }}
        />
  
        {/* CONTENT */}
        <Stack
          direction="row"
          spacing={2.5}
          alignItems="center" // 👈 vertical centering
          sx={{ position: "relative" }}
        >
          {/* Icon bubble on the left */}
          <Box sx={glassIcon(tone)}>{icon}</Box>
  
          {/* Text on the right */}
          <Box>
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: 16,
                color: "#0F172A",
              }}
            >
              {title}
            </Typography>
  
            <Typography
              sx={{
                mt: 0.4,
                fontSize: 14,
                lineHeight: 1.45,
                color: "#1E293B",
              }}
            >
              {desc}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    )
  }
  
  
