"use client";

import type { Tickets } from "../../lib/types";
import { useState } from "react";
import { useTicket } from "../../lib/api";
import { Ticket } from "lucide-react";
import { getTicketStatus } from "@/utils/ticketStatus";
import { formatDate } from "@/utils/formatDate";

export default function UseTicketView() {
    const [ticketId, setTicketId] = useState("");
    const [ticket, setTicket] = useState<Tickets | null>(null);
    const [error, setError] = useState("");

    const normalButton = "flex-1 flex items-center justify-center gap-2 border rounded px-4 py-2 hover:bg-gray-100";

    async function handleUseTicket() {
        try {
            const updatedTicket = await useTicket(ticketId);

            setTicket(updatedTicket);
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
                    {!ticket && (
                        <>
                            <div>
                                <Ticket className="w-28 h-28 text-gray-800" strokeWidth={0.5} />
                            </div>                    

                            <div className="text-center space-y-1">
                                <h2 className="text-2xl font-semibold">
                                    Fill in code to use ticket
                                </h2>

                                <p>
                                    <span className="font-semibold">Code:</span><br />
                                    <input
                                        type="text"
                                        placeholder="Ticket id"
                                        value={ticketId}
                                        onChange={(e) => setTicketId(e.target.value)}
                                        className="border rounded px-1 py-1 w-full"
                                    />
                                </p>

                                <p>
                                    <span className="font-semibold">Created:</span><br />
                                    ----------
                                </p>

                                <p>
                                    <span className="font-semibold">Status:</span><br />
                                    <span className={`rounded-full px-3 py-1`}>
                                        ----------
                                    </span>
                                </p>
                            </div>
                        </>
                    )}

                    {ticket && (
                        <>
                            <div>
                                <Ticket className="w-28 h-28 text-gray-800" strokeWidth={0.5} />
                            </div>                    

                            <div className="text-center space-y-1">
                                <h2 className="text-2xl font-semibold">
                                    ✓ Ticket used successfully
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
                    className={normalButton}
                    onClick={handleUseTicket}
                >
                    <Ticket size={18} />
                    Use ticket
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