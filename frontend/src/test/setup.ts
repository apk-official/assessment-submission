import "@testing-library/jest-dom/vitest";
import { server } from "./msw/server";
import { afterAll, afterEach, beforeAll } from "vitest";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" }); // TEMP

  server.events.on("request:start", ({ request }) => {
    console.log("MSW request:", request.method, request.url);
  });

  server.events.on("request:unhandled", ({ request }) => {
    console.log("MSW UNHANDLED:", request.method, request.url);
  });
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());