import { createFileRoute } from "@tanstack/react-router";
import PaymentsPage from "../../pages/PaymentsPage";

export const Route = createFileRoute("/_app/payments")({
  component: PaymentsPage,
});
