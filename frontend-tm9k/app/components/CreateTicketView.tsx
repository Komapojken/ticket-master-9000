"use client";

import type { Tickets } from "../../lib/types";
import { useState } from "react";
import { createTicket } from "../../lib/api";
import { Plus, Ticket } from "lucide-react";
import { getTicketStatus } from "@/utils/ticketStatus";
import { formatDate } from "@/utils/formatDate";

export default function CreateTicketView() {
    const [ticket, setTicket] = useState<Tickets | null>(null);
    const [error, setError] = useState("");

    const status = ticket ? getTicketStatus(ticket) : null;
    const hasTicket = ticket !== null;
    const normalButton = "flex-1 flex items-center justify-center gap-2 border rounded px-4 py-2 hover:bg-gray-100";

    async function handleCreateTicket() {
        try {
            const createdTicket = await createTicket();

            setTicket(createdTicket);
            setError("");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-full gap-6">
                <div className="min-h-[300px] flex flex-col items-center justify-center">
                    <div>
                        <Ticket className="w-28 h-28 text-gray-800" strokeWidth={0.5} />
                    </div>

                    <div className="text-center space-y-1">
                        <h2 className="text-2xl font-semibold">
                            {hasTicket
                                ? "✓ Ticket created successfully"
                                : "Click create to generate ticket"}
                        </h2>

                        <div className="h-14 flex items-center justify-center">
                            {hasTicket
                                ? 
                                    <p>
                                        <span className="font-semibold">Code:</span><br />
                                        <span className="font-mono w-80">
                                            {ticket.id}
                                        </span>
                                    </p>
                                : 
                                    <p>
                                        <span className="font-semibold">Code:</span><br />
                                        <span>XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX</span>
                                    </p>
                            }
                        </div>

                        <div className="h-14 flex items-center justify-center">
                            {hasTicket
                                ? 
                                    <p>
                                        <span className="font-semibold">Created:</span><br />
                                        {formatDate(ticket.createdAt)}
                                    </p>
                                : 
                                    <p>
                                        <span className="font-semibold">Created:</span><br />
                                        <span>----------</span>
                                    </p>
                            }
                        </div>

                        <div className="h-14 flex items-center justify-center">
                            {hasTicket
                                ? 
                                    <p>
                                        <span className="font-semibold">Status:</span><br />
                                        <span className={`rounded-full px-3 py-1 ${status?.className}`}>
                                            {status?.text}
                                        </span>
                                    </p>
                                : 
                                    <p>
                                        <span className="font-semibold">Status:</span><br />
                                        <span className={`rounded-full px-3 py-1`}>
                                            <span>----------</span>
                                        </span>
                                    </p>
                            }
                        </div>
                    </div>
                </div>                

                <button
                    className={normalButton}
                    onClick={handleCreateTicket}
                >
                    <Plus size={18} />
                    Create ticket
                </button>

                {error && (
                    <div className="rounded border border-red-300 bg-red-50 px-4 py-2 text-red-700">
                        {error}
                    </div>
                )}
            </div>
        </>
    )
}