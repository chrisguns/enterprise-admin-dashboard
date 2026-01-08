import { useNavigate } from "@tanstack/react-router";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LockIcon from "@mui/icons-material/Lock";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { setRole } from "../core/session/session";
import { useSettings } from "../core/settings/SettingsProvider";


export default function SplashPage() {
    const navigate = useNavigate();
    const { settings } = useSettings();

    const onOwner = async () => {
        setRole("owner");
        await navigate({ to: "/schedule" });
    };

    const onBook = async () => {
        setRole("client");
        await navigate({ to: "/book" });
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: { xs: 4, md: 7 } }}>
                <Paper
                    sx={{
                        p: { xs: 3, md: 5 },
                        border: "1px solid rgba(0,0,0,0.06)",
                        background:
                            "linear-gradient(135deg, rgba(30,94,255,0.12), rgba(110,89,249,0.10))",
                    }}
                >
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Chip
                                icon={<StorefrontIcon />}
                                label={settings.businessName}
                                color="secondary"
                                variant="outlined"
                                sx={{ fontWeight: 900 }}
                            />
                            <Chip
                                label="Book in seconds • No account"
                                variant="outlined"
                                sx={{ fontWeight: 800 }}
                            />
                        </Stack>

                        <Typography variant="h3">
                            Simple booking for clients.
                            <br />
                            Powerful scheduling for pros.
                        </Typography>

                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
                            A customizable scheduling platform for stylists, barbers, massage therapists,
                            and beauty entrepreneurs — built to run your day.
                        </Typography>

                        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ pt: 1 }}>
                            <Button
                                size="large"
                                variant="contained"
                                startIcon={<CalendarMonthIcon />}
                                onClick={onBook}
                            >
                                Book an appointment
                            </Button>

                            <Button
                                size="large"
                                variant="outlined"
                                startIcon={<LockIcon />}
                                onClick={onOwner}
                            >
                                Owner / Stylist login
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>

                <Box sx={{ height: 18 }} />

                <Box
                    sx={{
                        display: "grid",
                        gap: 2,
                        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                    }}
                >
                    {[
                        {
                            title: "Business hours + rules",
                            desc: "Set availability, buffers, and slot intervals — the foundation of great scheduling.",
                        },
                        {
                            title: "Clients + notes",
                            desc: "Track preferences, services, and history without forcing accounts (yet).",
                        },
                        {
                            title: "Custom branding",
                            desc: "Owner picks colors + name. Same platform works for any beauty business.",
                        },
                    ].map((c) => (
                        <Card key={c.title}>
                            <CardContent>
                                <Typography sx={{ fontWeight: 900 }}>{c.title}</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                    {c.desc}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Container>
    );
}
