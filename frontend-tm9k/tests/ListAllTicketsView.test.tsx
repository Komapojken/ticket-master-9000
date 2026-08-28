import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListAllTicketsView from "@/app/components/ListAllTicketsView";
import { listAllTickets } from "@/lib/api";
import { createMockTicket } from "./helpers/mockTickets";

vi.mock("@/lib/api", () => ({
    listAllTickets: vi.fn(),
}));

describe("ListAllTicketsView", () => {
    beforeEach(() => {
        vi.mocked(listAllTickets).mockReset();
    });

    it("should return all the tickets", async () => {
        const tickets = [
            createMockTicket({ id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" }),
            createMockTicket({
                id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
                usedAt: "2026-08-28T09:00:00.000Z",
            }),
            createMockTicket({
                id: "cccccccc-cccc-cccc-cccc-cccccccccccc",
                deletedAt: "2026-08-28T09:00:00.000Z",
            }),
        ];

        vi.mocked(listAllTickets).mockResolvedValue(tickets);

        render(<ListAllTicketsView />);

        expect(await screen.findByText("aaaaaaaa-aaa...")).toBeInTheDocument();
        expect(screen.getByText("bbbbbbbb-bbb...")).toBeInTheDocument();
        expect(screen.getByText("cccccccc-ccc...")).toBeInTheDocument();
    });

    it("should filter unused tickets", async () => {
        const tickets = [
            createMockTicket({ id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" }),
            createMockTicket({
                id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
                usedAt: "2026-08-28T09:00:00.000Z",
            }),
        ];

        vi.mocked(listAllTickets).mockResolvedValue(tickets);

        const user = userEvent.setup();
        render(<ListAllTicketsView />);

        await screen.findByText("aaaaaaaa-aaa...");

        await user.click(screen.getByRole("button", { name: /^unused$/i }));

        expect(screen.getByText("aaaaaaaa-aaa...")).toBeInTheDocument();
        expect(screen.queryByText("bbbbbbbb-bbb...")).not.toBeInTheDocument();
    });

    it("should filter tickets by search", async () => {
        const tickets = [
            createMockTicket({ id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" }),
            createMockTicket({ id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb" }),
        ];

        vi.mocked(listAllTickets).mockResolvedValue(tickets);

        const user = userEvent.setup();
        render(<ListAllTicketsView />);

        await screen.findByText("aaaaaaaa-aaa...");

        await user.type(
            screen.getByPlaceholderText("Search ticket..."),
            "bbbbbbbb",
        );

        expect(screen.queryByText("aaaaaaaa-aaa...")).not.toBeInTheDocument();
        expect(screen.getByText("bbbbbbbb-bbb...")).toBeInTheDocument();
    });

    it("should copy a ticket id to clipboard", async () => {
        const ticket = createMockTicket({
            id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        });
        const writeText = vi.fn().mockResolvedValue(undefined);

        Object.defineProperty(window.navigator, "clipboard", {
            value: { writeText },
            configurable: true,
        });
        vi.mocked(listAllTickets).mockResolvedValue([ticket]);

        render(<ListAllTicketsView />);

        await screen.findByText("aaaaaaaa-aaa...");

        fireEvent.click(screen.getByTitle("Copy ticket id"));

        expect(writeText).toHaveBeenCalledWith(ticket.id);
    });
});
