import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Dashboard from "./Dashboard";
import { server } from "@/test/msw/server";
import { http, HttpResponse } from "msw";

describe("Dashboard (integration)", () => {
  it("loads results from API and renders key UI", async () => {
    render(<Dashboard instanceId="abc-123" />);
    expect(await screen.findByText(/overview/i)).toBeInTheDocument();
  });

  it("renders error UI when API fails", async () => {
    server.use(
      http.get("*/api/assessment/results/:instanceId", () =>
        HttpResponse.json({ error: "Instance not found" }, { status: 404 })
      )
    );

    render(<Dashboard instanceId="missing" />);
    expect(await screen.findByText(/instance not found/i)).toBeInTheDocument();
  });
});