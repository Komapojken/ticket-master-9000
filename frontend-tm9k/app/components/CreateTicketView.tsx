"use client";

import type { Tickets } from "../../lib/types";
import { useState } from "react";
import { createTicket } from "../../lib/api";
import { Plus, Ticket } from "lucide-react";
import { getTicketStatus } from "@/utils/ticketStatus";
import { formatDate } from "@/utils/formatDate";

export default function CreateTicketView() {
    const [ticket, setTicket] = useState<Tickets | null>(null);

    const normalCreateButton = "flex-1 flex items-center justify-center gap-2 border rounded px-4 py-2 hover:bg-gray-100";

    async function handleCreateTicket() {
        const newTicket = await createTicket();

        setTicket(newTicket);
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-full gap-6">
                <div className="min-h-[300px] flex flex-col items-center justify-center">
                    {ticket && (
                        <>
                            <div>
                                <Ticket className="w-28 h-28 text-gray-800" strokeWidth={0.5} />
                            </div>                    

                            <div className="text-center space-y-1">
                                <h2 className="text-2xl font-semibold">
                                    New ticket created!
                                </h2>

                                <p>
                                    <span className="font-semibold">Code:</span><br />
                                    {ticket.id}
                                </p>

                                <p>
                                    <span className="font-semibold">Created:</span><br />
                                    {formatDate(ticket.createdAt)}
                                </p>

                                <p>
                                    <span className="font-semibold">Status:</span><br />
                                    <span className={`rounded-full px-3 py-1 ${getTicketStatus(ticket).className}`}>
                                        {getTicketStatus(ticket).text}
                                    </span>
                                </p>
                            </div>
                        </>
                    )}
                </div>                

                <button
                    className={normalCreateButton}
                    onClick={handleCreateTicket}
                >
                    <Plus size={18} />
                    Create new ticket
                </button>                
            </div>
        </>
    )
}