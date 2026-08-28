import { describe, it, expect, vi, beforeEach } from "vitest";
import {
    createTicket,
    useTicket,
    deleteTicket,
    listAllTickets,
} from "@/lib/api";
import { createMockTicket } from "./helpers/mockTickets";

describe("API", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("should create a ticket", async () => {
        const ticket = createMockTicket();

        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ticket,
            }),
        );

        const result = await createTicket();

        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:3001/tickets",
            expect.objectContaining({ method: "POST" }),
        );
        expect(result).toEqual(ticket);
    });

    it("should use a valid ticket", async () => {
        const ticket = createMockTicket({
            usedAt: "2026-08-28T09:00:00.000Z",
        });

        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ticket,
            }),
        );

        const result = await useTicket(ticket.id);

        expect(fetch).toHaveBeenCalledWith(
            `http://localhost:3001/tickets/${ticket.id}/use`,
            expect.objectContaining({ method: "PATCH" }),
        );
        expect(result).toEqual(ticket);
    });

    it("should return 404 if ticket does not exist", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: false,
                json: async () => ({ message: "Ticket not found" }),
            }),
        );

        await expect(useTicket("missing-id")).rejects.toThrow(
            "Ticket not found",
        );
    });

    it("should not be able to use a ticket twice", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: false,
                json: async () => ({ message: "Ticket already used" }),
            }),
        );

        await expect(
            useTicket("11111111-1111-1111-1111-111111111111"),
        ).rejects.toThrow("Ticket already used");
    });

    it("should not be able to use a deleted ticket", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: false,
                json: async () => ({ message: "Ticket has been deleted" }),
            }),
        );

        await expect(
            useTicket("11111111-1111-1111-1111-111111111111"),
        ).rejects.toThrow("Ticket has been deleted");
    });

    it("should delete a ticket (soft-delete)", async () => {
        const ticket = createMockTicket({
            deletedAt: "2026-08-28T09:00:00.000Z",
        });

        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ticket,
            }),
        );

        const result = await deleteTicket(ticket.id);

        expect(fetch).toHaveBeenCalledWith(
            `http://localhost:3001/tickets/${ticket.id}/delete`,
            expect.objectContaining({ method: "PATCH" }),
        );
        expect(result).toEqual(ticket);
    });

    it("should return 404 if ticket does not exist when deleting", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: false,
                json: async () => ({ message: "Ticket not found" }),
            }),
        );

        await expect(deleteTicket("missing-id")).rejects.toThrow(
            "Ticket not found",
        );
    });

    it("should not delete a ticket already deleted", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: false,
                json: async () => ({
                    message: "Ticket has already been deleted",
                }),
            }),
        );

        await expect(
            deleteTicket("11111111-1111-1111-1111-111111111111"),
        ).rejects.toThrow("Ticket has already been deleted");
    });

    it("should return all the tickets", async () => {
        const tickets = Array.from({ length: 10 }, (_, index) =>
            createMockTicket({
                id: `00000000-0000-0000-0000-${String(index).padStart(12, "0")}`,
            }),
        );

        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: true,
                json: async () => tickets,
            }),
        );

        const result = await listAllTickets();

        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:3001/tickets",
            expect.objectContaining({ method: "GET" }),
        );
        expect(result).toHaveLength(10);
    });
});
