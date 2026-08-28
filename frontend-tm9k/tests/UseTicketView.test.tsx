import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UseTicketView from "@/app/components/UseTicketView";
import { useTicket } from "@/lib/api";
import { createMockTicket } from "./helpers/mockTickets";

vi.mock("@/lib/api", () => ({
    useTicket: vi.fn(),
}));

describe("UseTicketView", () => {
    beforeEach(() => {
        vi.mocked(useTicket).mockReset();
    });

    it("should use a valid ticket", async () => {
        const ticket = createMockTicket({
            usedAt: "2026-08-28T09:00:00.000Z",
        });
        vi.mocked(useTicket).mockResolvedValue(ticket);

        const user = userEvent.setup();
        render(<UseTicketView />);

        await user.type(screen.getByRole("textbox"), ticket.id);
        await user.click(screen.getByRole("button", { name: /use ticket/i }));

        expect(useTicket).toHaveBeenCalledWith(ticket.id);
        expect(
            await screen.findByText("✓ Ticket used successfully"),
        ).toBeInTheDocument();
        expect(screen.getByText("Used")).toBeInTheDocument();
    });

    it("should show an error when ticket does not exist", async () => {
        vi.mocked(useTicket).mockRejectedValue(
            new Error("Ticket not found"),
        );

        const user = userEvent.setup();
        render(<UseTicketView />);

        await user.type(
            screen.getByRole("textbox"),
            "11111111-1111-1111-1111-111111111111",
        );
        await user.click(screen.getByRole("button", { name: /use ticket/i }));

        expect(
            await screen.findByText("Ticket not found"),
        ).toBeInTheDocument();
    });

    it("should show an error when ticket is already used", async () => {
        vi.mocked(useTicket).mockRejectedValue(
            new Error("Ticket already used"),
        );

        const user = userEvent.setup();
        render(<UseTicketView />);

        await user.type(
            screen.getByRole("textbox"),
            "11111111-1111-1111-1111-111111111111",
        );
        await user.click(screen.getByRole("button", { name: /use ticket/i }));

        expect(
            await screen.findByText("Ticket already used"),
        ).toBeInTheDocument();
    });

    it("should show an error when ticket has been deleted", async () => {
        vi.mocked(useTicket).mockRejectedValue(
            new Error("Ticket has been deleted"),
        );

        const user = userEvent.setup();
        render(<UseTicketView />);

        await user.type(
            screen.getByRole("textbox"),
            "11111111-1111-1111-1111-111111111111",
        );
        await user.click(screen.getByRole("button", { name: /use ticket/i }));

        expect(
            await screen.findByText("Ticket has been deleted"),
        ).toBeInTheDocument();
    });
});
