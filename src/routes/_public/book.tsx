import { createFileRoute } from "@tanstack/react-router";
import BookPage from "../../pages/BookPage";
import { AppProviders } from "../../app/AppProviders";

export const Route = createFileRoute("/_public/book")({
  component: () => (
    <AppProviders>
      <BookPage />
    </AppProviders>
  ),
});
