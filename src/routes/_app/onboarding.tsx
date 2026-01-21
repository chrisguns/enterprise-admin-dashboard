import { createFileRoute } from "@tanstack/react-router";
import OwnerOnboardingPage from "../../pages/OwnerOnboardingPage";

export const Route = createFileRoute("/_app/onboarding")({
  component: OwnerOnboardingPage,
});
