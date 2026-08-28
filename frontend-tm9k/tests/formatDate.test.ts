import { describe, it, expect } from "vitest";
import { formatDate } from "@/utils/formatDate";

describe("formatDate", () => {
    it("should format an ISO date as sv-SE locale string", () => {
        const formatted = formatDate("2026-01-15T10:30:00.000Z");

        expect(formatted).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
    });
});
