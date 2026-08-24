"use client";

import { useState, useEffect } from "react";
import { listAllTickets } from "../../lib/api";
import type { Ticket } from "../../lib/types";

export default function ListAllTicketsView() {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        async function loadTickets() {
            const data = await listAllTickets();
            setTickets(data);
        }

        loadTickets();
    }, []);

    return (
        <>
            <ul>
                {tickets.map(ticket => (
                    <li key={ticket.id} className="border p-2 mb-2">
                        <strong>Id:</strong> {ticket.id}
                        <strong>Created:</strong> {ticket.createdAt}
                        <strong>Used:</strong> {ticket.usedAt ?? "No"}
                        <strong>Deleted:</strong> {ticket.deletedAt ?? "No"}
                    </li>
                ))}
            </ul>
        </>
    )
}