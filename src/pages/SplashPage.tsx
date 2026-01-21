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

type Mode = "dark" | "light"
type Tone = "blue" | "red" | "green"

export default function SplashPage() {
  // ✅ Day 3 goal: same splash, supports both dark + light without breaking contrast
  // Change this to "light" to preview the light theme
  const MODE: Mode = "light" as Mode

  const isDark = MODE === "dark"

  // ---------- Mode tokens ----------
  const page = {
    fg: isDark ? "rgba(255,255,255,0.92)" : "#0B1220",
    fgMuted: isDark ? "rgba(234,242,255,0.80)" : "rgba(15,23,42,0.72)",
    fgSubtle: isDark ? "rgba(234,242,255,0.55)" : "rgba(15,23,42,0.55)",
    chipText: isDark ? "rgba(255,255,255,0.78)" : "rgba(15,23,42,0.72)",
    link: isDark ? "rgba(180,210,255,0.92)" : "rgba(37,99,235,0.90)",
    divider: isDark ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.10)",
    bg: isDark
      ? `
        radial-gradient(900px 500px at 50% -15%, rgba(180,210,255,0.28), transparent 60%),
        radial-gradient(600px 420px at 85% 28%, rgba(255,170,170,0.16), transparent 58%),
        radial-gradient(650px 420px at 10% 70%, rgba(160,235,200,0.12), transparent 60%),
        linear-gradient(180deg, #070B12 0%, #0A1120 50%, #060A12 100%)
      `
      : `
        radial-gradient(900px 520px at 20% 10%, rgba(169,208,255,0.85), transparent 55%),
        radial-gradient(850px 520px at 85% 18%, rgba(255,199,199,0.75), transparent 58%),
        radial-gradient(900px 560px at 55% 88%, rgba(185,245,219,0.55), transparent 60%),
        linear-gradient(180deg, #F6F8FF 0%, #F4F6FB 40%, #F7F7FA 100%)
      `,
  } as const

  // ---------- Shared “glass” tokens ----------
  // NOTE: in LIGHT mode, glass needs less “white sheen” and darker borders,
  // or it will wash everything out (your screenshot issue).
  const glassSurface = {
    background: isDark
      ? "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)"
      : "linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.45) 100%)",
    backdropFilter: "blur(22px) saturate(175%)",
    WebkitBackdropFilter: "blur(22px) saturate(175%)",
    border: isDark
      ? "1px solid rgba(255,255,255,0.16)"
      : "1px solid rgba(15,23,42,0.10)",
    boxShadow: isDark
      ? "0 40px 120px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.20)"
      : "0 30px 90px rgba(15,23,42,0.12), inset 0 1px 0 rgba(255,255,255,0.70)",
  } as const

  const glassPill = {
    background: isDark
      ? "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))"
      : "linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.55))",
    backdropFilter: "blur(18px) saturate(175%)",
    WebkitBackdropFilter: "blur(18px) saturate(175%)",
    border: isDark
      ? "1px solid rgba(255,255,255,0.16)"
      : "1px solid rgba(15,23,42,0.10)",
    boxShadow: isDark
      ? "0 18px 45px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.22)"
      : "0 16px 42px rgba(15,23,42,0.10), inset 0 1px 0 rgba(255,255,255,0.80)",
  } as const

  const glassButton = {
    textTransform: "none",
    fontWeight: 800,
    borderRadius: 999,
    px: 2.5,
    py: 1.1,
    ...glassPill,
    color: isDark ? "rgba(255,255,255,0.92)" : "#0B1220",
    "&:hover": {
      background: isDark
        ? "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.08))"
        : "linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,255,255,0.62))",
      border: isDark
        ? "1px solid rgba(255,255,255,0.24)"
        : "1px solid rgba(15,23,42,0.14)",
    },
  } as const

  // Near-transparent glass “bubble” used for icon containers (iOS-like)
  const glassIcon = (tone: "blue" | "red" | "green") => {
    const toneMap = {
      blue: { ring: "rgba(58,111,234,0.28)", icon: "#3A6FEA" },
      red: { ring: "rgba(214,69,69,0.28)", icon: "#D64545" },
      green: { ring: "rgba(47,158,111,0.28)", icon: "#2F9E6F" },
    } as const
  
    const t = toneMap[tone]
  
    return {
      // ✅ true circle
      width: 44,
      height: 44,
      borderRadius: "50%",
      flex: "0 0 44px", // ✅ prevents flex squish/stretch
      position: "relative",
      display: "grid",
      placeItems: "center",
      overflow: "hidden",
  
      // ✅ keep svg crisp (on top)
      "& > svg": {
        position: "relative",
        zIndex: 1,
        fontSize: 22,
        transform: "translateZ(0)",
      },
  
      // ✅ glass layer behind icon
      "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.22)",
        border: `1px solid ${t.ring}`,
        boxShadow: `
          0 8px 18px rgba(0,0,0,0.18),
          inset 0 1px 0 rgba(255,255,255,0.85)
        `,
      },
  
      // ⚠️ IMPORTANT: remove backdropFilter here (this is what keeps rasterizing)
      // backdropFilter: "blur(...)",
      // WebkitBackdropFilter: "blur(...)",
  
      color: t.icon,
    } as const
  }
  

  // Sheen overlay — this is what washed your light screenshot out.
  // LIGHT mode needs a much smaller intensity.
  const heroSheen = isDark
    ? "linear-gradient(120deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04) 42%, transparent 65%)"
    : "linear-gradient(120deg, rgba(255,255,255,0.22), rgba(255,255,255,0.06) 42%, transparent 70%)"

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: page.bg,
        color: page.fg,
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
                bgcolor: isDark ? "rgba(255,255,255,0.85)" : "rgba(15,23,42,0.65)",
                boxShadow: isDark
                  ? "0 0 0 6px rgba(255,255,255,0.08)"
                  : "0 0 0 6px rgba(15,23,42,0.06)",
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
                color: page.chipText,
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
              background: heroSheen,
              pointerEvents: "none",
              opacity: isDark ? 1 : 0.85,
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
                  color: isDark ? "rgba(255,255,255,0.85)" : "rgba(15,23,42,0.80)",
                  border: isDark
                    ? "1px solid rgba(150,190,255,0.22)"
                    : "1px solid rgba(37,99,235,0.16)",
                  "& .MuiChip-label": { fontWeight: 800 },
                }}
              />
              <Chip
                size="small"
                label="Universal for any service business"
                sx={{
                  ...glassPill,
                  color: isDark ? "rgba(255,255,255,0.78)" : "rgba(15,23,42,0.72)",
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
                  color: isDark ? "rgba(255,255,255,0.94)" : "#0B1220",
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
                  color: page.fgMuted,
                  fontSize: { xs: 15, sm: 16, md: 18 },
                  lineHeight: 1.6,
                }}
              >
                A modern booking experience for professionals who work by appointment — stylists,
                therapists, coaches, consultants, and more.
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
                  background: isDark
                    ? "linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.08))"
                    : "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.68))",
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.22)"
                    : "1px solid rgba(15,23,42,0.12)",
                }}
              >
                Book an appointment
              </Button>

              <Button component={Link} to="/schedule" sx={{ ...glassButton }}>
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
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.12)"
                    : "1px solid rgba(15,23,42,0.10)",
                  color: page.link,
                  "&:hover": {
                    background: isDark ? "rgba(180,210,255,0.08)" : "rgba(37,99,235,0.08)",
                    border: isDark
                      ? "1px solid rgba(180,210,255,0.22)"
                      : "1px solid rgba(37,99,235,0.18)",
                  },
                }}
              >
                I’m a business owner →
              </Button>
            </Stack>

            <Divider sx={{ borderColor: page.divider }} />

            {/* Feature cards */}
            <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ pt: 0.5 }}>
              <FeatureCard
                mode={MODE}
                icon={<CalendarMonthRoundedIcon sx={{ fontSize: 30 }} />}
                tone="green"
                title="Fast booking"
                desc="A clean, mobile-first flow that clients understand instantly."
                glassIcon={glassIcon}
              />
              <FeatureCard
                mode={MODE}
                icon={<AccessTimeRoundedIcon sx={{ fontSize: 30 }} />}
                tone="red"
                title="Business hours"
                desc="Availability, breaks, buffers, and scheduling rules with full control."
                glassIcon={glassIcon}
              />
              <FeatureCard
                mode={MODE}
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
          <Typography sx={{ color: page.fgSubtle, fontSize: 12 }}>
            © 2026 Schedule
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              component={Link}
              to="/privacy"
              sx={{
                textTransform: "none",
                fontSize: 12,
                color: page.fgSubtle,
                "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)" },
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
                color: page.fgSubtle,
                "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)" },
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
  mode,
  icon,
  title,
  desc,
  tone,
  glassIcon,
}: {
  mode: Mode
  icon: React.ReactNode
  title: string
  desc: string
  tone: Tone
  glassIcon: (tone: Tone) => Record<string, unknown>
}) {
  const isDark = mode === "dark"

  return (
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        borderRadius: 4,
        p: 3,
        minHeight: 140,

        // Frosted card must match mode
        background: isDark ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.72)",
        backdropFilter: "blur(26px) saturate(180%)",
        WebkitBackdropFilter: "blur(26px) saturate(180%)",
        border: isDark ? "1px solid rgba(255,255,255,0.16)" : "1px solid rgba(15,23,42,0.10)",

        boxShadow: isDark
          ? "0 28px 60px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.18)"
          : "0 26px 60px rgba(15,23,42,0.10), inset 0 1px 0 rgba(255,255,255,0.75)",

        position: "relative",
        overflow: "hidden",
        transition: "transform 200ms ease, box-shadow 200ms ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: isDark ? "0 36px 80px rgba(0,0,0,0.35)" : "0 34px 80px rgba(15,23,42,0.14)",
        },
      }}
    >
      <Stack direction="row" spacing={2.25} alignItems="center" sx={{ position: "relative" }}>
        <Box sx={glassIcon(tone)}>{icon}</Box>

        <Box>
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: 16,
              color: isDark ? "rgba(255,255,255,0.92)" : "#0F172A",
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              mt: 0.4,
              fontSize: 14,
              lineHeight: 1.45,
              color: isDark ? "rgba(234,242,255,0.78)" : "rgba(15,23,42,0.72)",
            }}
          >
            {desc}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  )
}
