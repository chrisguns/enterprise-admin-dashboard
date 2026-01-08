import { createFileRoute } from "@tanstack/react-router";
import BookPage from "../../pages/BookPage";

export const Route = createFileRoute("/_public/book")({
  component: BookPage,
});
