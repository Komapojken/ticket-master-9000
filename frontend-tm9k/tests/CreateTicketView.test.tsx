import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateTicketView from "@/app/components/CreateTicketView";
import { createTicket } from "@/lib/api";
import { createMockTicket } from "./helpers/mockTickets";

vi.mock("@/lib/api", () => ({
    createTicket: vi.fn(),
}));

describe("CreateTicketView", () => {
    beforeEach(() => {
        vi.mocked(createTicket).mockReset();
    });

    it("should create a ticket", async () => {
        const ticket = createMockTicket();
        vi.mocked(createTicket).mockResolvedValue(ticket);

        const user = userEvent.setup();
        render(<CreateTicketView />);

        expect(
            screen.getByText("Click create to generate ticket"),
        ).toBeInTheDocument();

        await user.click(
            screen.getByRole("button", { name: /create ticket/i }),
        );

        expect(createTicket).toHaveBeenCalledOnce();
        expect(
            await screen.findByText("✓ Ticket created successfully"),
        ).toBeInTheDocument();
        expect(screen.getByText(ticket.id)).toBeInTheDocument();
        expect(screen.getByText("Not used")).toBeInTheDocument();
    });

    it("should show an error when ticket creation fails", async () => {
        vi.mocked(createTicket).mockRejectedValue(
            new Error("Failed to create ticket"),
        );

        const user = userEvent.setup();
        render(<CreateTicketView />);

        await user.click(
            screen.getByRole("button", { name: /create ticket/i }),
        );

        expect(
            await screen.findByText("Failed to create ticket"),
        ).toBeInTheDocument();
    });
});
