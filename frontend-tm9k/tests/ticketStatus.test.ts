import { describe, it, expect } from "vitest";
import { getTicketStatus } from "@/utils/ticketStatus";
import { createMockTicket } from "./helpers/mockTickets";

describe("getTicketStatus", () => {
    it("should return Not used for an active ticket", () => {
        const status = getTicketStatus(createMockTicket());

        expect(status).toEqual({
            text: "Not used",
            className: "bg-green-100 text-green-700",
        });
    });

    it("should return Used for a used ticket", () => {
        const status = getTicketStatus(
            createMockTicket({ usedAt: "2026-08-28T09:00:00.000Z" }),
        );

        expect(status).toEqual({
            text: "Used",
            className: "bg-yellow-100 text-yellow-700",
        });
    });

    it("should return Deleted for a deleted ticket", () => {
        const status = getTicketStatus(
            createMockTicket({ deletedAt: "2026-08-28T09:00:00.000Z" }),
        );

        expect(status).toEqual({
            text: "Deleted",
            className: "bg-red-100 text-red-700",
        });
    });
});
