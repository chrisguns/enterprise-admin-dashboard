import { createFileRoute, redirect } from "@tanstack/react-router";
import SchedulePage from "../../pages/SchedulePage";
import { getRole } from "../../core/session/session";

export const Route = createFileRoute("/_app/schedule")({
  beforeLoad: () => {
    if (getRole() !== "owner") {
      throw redirect({ to: "/", replace: true });
    }
  },
  component: SchedulePage,
});
