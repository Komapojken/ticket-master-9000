"use client";

import type { Ticket } from "../../lib/types";
import { useState } from "react";
import { createTicket } from "../../lib/api";

export default function CreateTicketView() {
    const [ticket, setTicket] = useState<Ticket | null>(null);

    async function handleCreateTicket() {
        const newTicket = await createTicket();

        setTicket(newTicket);
    }

    return (
        <>
            <button className="border px-4 py-2 rounded hover:bg-gray-100"
                onClick={handleCreateTicket}
            >
                Create
            </button>

            {ticket && (
                <>
                    <p>Id: {ticket.id}</p>
                    <p>Created: {ticket.createdAt}</p>
                </>
            )}
        
        </>
    )
}