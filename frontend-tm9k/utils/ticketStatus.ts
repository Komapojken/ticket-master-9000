import { Tickets } from "../lib/types";

export function getTicketStatus(ticket: Tickets) {
    if (ticket.deletedAt) {
        return {
            text: "Deleted",
            className: "bg-red-100 text-red-700",
        };
    }

    if (ticket.usedAt) {
        return {
            text: "Used",
            className: "bg-yellow-100 text-yellow-700",
        };
    }

    return {
        text: "Not used",
        className: "bg-green-100 text-green-700",
    };
}