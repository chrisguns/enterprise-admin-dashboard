import { useNavigate } from "@tanstack/react-router";
import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useAuth } from "../core/auth/AuthProvider";

export default function LoginPage() {
  const navigate = useNavigate();
  const { signInAsOwner } = useAuth();

  const onSignIn = () => {
    signInAsOwner();
    navigate({ to: "/onboarding", replace: true });
  };

  return (
    <Box sx={{ maxWidth: 520, mx: "auto", p: { xs: 2, md: 3 } }}>
      <Card>
        <CardContent>
          <Stack spacing={1.5}>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>
              Owner sign in
            </Typography>
            <Typography variant="body2" color="text.secondary">
              For now this is a simple “demo sign in”. Later we’ll swap in real auth.
            </Typography>

            <Button
              variant="contained"
              onClick={onSignIn}
              sx={{ textTransform: "none", fontWeight: 800, mt: 1 }}
            >
              Continue as owner
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
