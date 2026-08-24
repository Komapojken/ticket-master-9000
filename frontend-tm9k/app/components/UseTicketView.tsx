"use client";

import { useState } from "react";
import { useTicket } from "../../lib/api";

export default function UseTicketView() {
    const [ticketId, setTicketId] = useState("");
    const [message, setMessage] = useState("");

    async function handleUseTicket() {
        try {
            const response = await useTicket(ticketId);

            setMessage(response.message);
        } catch {
            setMessage("Failed to use ticket");
        }
    }

    return (
        <>
            <input
                type="text"
                placeholder="Ticket id"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                className="border rounded px-3 py-2 w-full"
            />

            <button className="border px-4 py-2 rounded hover:bg-gray-100"
                onClick={handleUseTicket}
            >
                Use ticket
            </button>

            {message && <p>{message}</p>}
        </>
    )
}