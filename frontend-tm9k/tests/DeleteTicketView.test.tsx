import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteTicketView from "@/app/components/DeleteTicketView";
import { deleteTicket } from "@/lib/api";
import { createMockTicket } from "./helpers/mockTickets";

vi.mock("@/lib/api", () => ({
    deleteTicket: vi.fn(),
}));

describe("DeleteTicketView", () => {
    beforeEach(() => {
        vi.mocked(deleteTicket).mockReset();
    });

    it("should delete a ticket (soft-delete)", async () => {
        const ticket = createMockTicket({
            deletedAt: "2026-08-28T09:00:00.000Z",
        });
        vi.mocked(deleteTicket).mockResolvedValue(ticket);

        const user = userEvent.setup();
        render(<DeleteTicketView />);

        await user.type(screen.getByRole("textbox"), ticket.id);
        await user.click(
            screen.getByRole("button", { name: /delete ticket/i }),
        );

        expect(deleteTicket).toHaveBeenCalledWith(ticket.id);
        expect(
            await screen.findByText("✓ Ticket deleted successfully"),
        ).toBeInTheDocument();
        expect(screen.getByText("Deleted")).toBeInTheDocument();
    });

    it("should show an error when ticket does not exist", async () => {
        vi.mocked(deleteTicket).mockRejectedValue(
            new Error("Ticket not found"),
        );

        const user = userEvent.setup();
        render(<DeleteTicketView />);

        await user.type(
            screen.getByRole("textbox"),
            "11111111-1111-1111-1111-111111111111",
        );
        await user.click(
            screen.getByRole("button", { name: /delete ticket/i }),
        );

        expect(
            await screen.findByText("Ticket not found"),
        ).toBeInTheDocument();
    });

    it("should show an error when ticket is already deleted", async () => {
        vi.mocked(deleteTicket).mockRejectedValue(
            new Error("Ticket has already been deleted"),
        );

        const user = userEvent.setup();
        render(<DeleteTicketView />);

        await user.type(
            screen.getByRole("textbox"),
            "11111111-1111-1111-1111-111111111111",
        );
        await user.click(
            screen.getByRole("button", { name: /delete ticket/i }),
        );

        expect(
            await screen.findByText("Ticket has already been deleted"),
        ).toBeInTheDocument();
    });
});
