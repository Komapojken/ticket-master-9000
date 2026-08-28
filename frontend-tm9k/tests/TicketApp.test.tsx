import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TicketApp from "@/app/components/TicketApp";

vi.mock("@/lib/api", () => ({
    createTicket: vi.fn(),
    useTicket: vi.fn(),
    deleteTicket: vi.fn(),
    listAllTickets: vi.fn().mockResolvedValue([]),
}));

describe("TicketApp", () => {
    it("should hide admin views for user role", () => {
        render(<TicketApp />);

        expect(
            screen.queryByRole("button", { name: /delete ticket/i }),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByRole("button", { name: /list tickets/i }),
        ).not.toBeInTheDocument();
    });

    it("should show admin views for admin role", async () => {
        const user = userEvent.setup();
        render(<TicketApp />);

        await user.click(screen.getByRole("button", { name: /^admin$/i }));

        expect(
            screen.getByRole("button", { name: /delete ticket/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /list tickets/i }),
        ).toBeInTheDocument();
    });

    it("should switch between views", async () => {
        const user = userEvent.setup();
        render(<TicketApp />);

        expect(
            screen.getByText("Click create to generate ticket"),
        ).toBeInTheDocument();

        await user.click(
            screen.getByRole("button", { name: /use ticket/i }),
        );

        expect(
            screen.getByText("Fill in code to use ticket"),
        ).toBeInTheDocument();
    });
});
