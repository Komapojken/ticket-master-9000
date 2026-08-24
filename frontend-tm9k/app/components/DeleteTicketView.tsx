"use client";

import { useState } from "react";
import { deleteTicket } from "../../lib/api";

export default function DeleteTicketView() {
    const [ticketId, setTicketId] = useState("");
    const [message, setMessage] = useState("");

    async function handleDeleteTicket() {
        try {
            const response = await deleteTicket(ticketId);

            setMessage(response.message);
        } catch {
            setMessage("Failed to delete the ticket");
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
                onClick={handleDeleteTicket}
            >
                Delete ticket
            </button>

            {message && <p>{message}</p>}
        </>
    )
}