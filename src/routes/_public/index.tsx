import { createFileRoute } from "@tanstack/react-router";
import SplashPage from "../../pages/SplashPage";

export const Route = createFileRoute("/_public/")({
  component: SplashPage,
});
