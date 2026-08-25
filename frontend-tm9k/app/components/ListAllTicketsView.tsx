"use client";

import { useState, useEffect } from "react";
import { listAllTickets } from "../../lib/api";
import type { Tickets } from "../../lib/types";
import { getTicketStatus } from "@/utils/ticketStatus";
import { formatDate } from "@/utils/formatDate";
import { Copy } from "lucide-react";

export default function ListAllTicketsView() {
    const [tickets, setTickets] = useState<Tickets[]>([]);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");

    const activeFilterButton = "flex-1 flex items-center justify-center gap-2 border px-2 py-1 text-sm rounded bg-blue-100 border-blue-500";
    const normalFilterButton = "flex-1 flex items-center justify-center gap-2 border px-2 py-1 text-sm rounded hover:bg-gray-100";

    useEffect(() => {
        async function loadTickets() {
            const data = await listAllTickets();
            setTickets(data);
        }

        loadTickets();
    }, []);

    const filteredTickets = tickets.filter(ticket => {
        const matchesStatus = (() => {
            switch (filter) {
                case "unused":
                    return ticket.usedAt === null && ticket.deletedAt === null;

                case "used":
                    return ticket.usedAt !== null;

                case "deleted":
                    return ticket.deletedAt !== null;

                default:
                    return true;
            }
        })();

        const matchesSearch =
            ticket.id.toLowerCase().includes(search.toLowerCase());

        return matchesStatus && matchesSearch;
    });

    return (
        <>
            <div>
                <div className="my-4 px-6 flex gap-4">
                    <p>
                        <span>Filter:</span>
                    </p>
                    <button
                        className={filter === "all" ? activeFilterButton : normalFilterButton}
                        onClick={() => setFilter("all")}
                    >
                        All
                    </button>

                    <button
                        className={filter === "unused" ? activeFilterButton : normalFilterButton}
                        onClick={() => setFilter("unused")}
                    >
                        Unused
                    </button>

                    <button
                        className={filter === "used" ? activeFilterButton : normalFilterButton}
                        onClick={() => setFilter("used")}
                    >
                        Used
                    </button>

                    <button
                        className={filter === "deleted" ? activeFilterButton : normalFilterButton}
                        onClick={() => setFilter("deleted")}
                    >
                        Deleted
                    </button>

                    <input
                        type="text"
                        placeholder="Search ticket..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded px-2 py-1 w-64"
                    />
                </div>
            </div>

            <div className="max-h-100 overflow-y-auto border rounded-lg">
                <table className="w-full">
                    <thead className="sticky top-0 bg-gray-100">
                        <tr>
                            <th className="text-left p-2">Code</th>
                            <th className="text-left p-2">Created</th>
                            <th className="text-left p-2">Status</th>
                            <th className="text-left p-2">Copy</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredTickets.map(ticket => (
                            <tr
                                key={ticket.id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="p-2 font-mono">
                                    {ticket.id.slice(0, 12)}...
                                </td>

                                <td className="p-2">
                                    {formatDate(ticket.createdAt)}
                                </td>

                                <td className="p-2">
                                    <span className={`rounded-full px-3 py-1 ${getTicketStatus(ticket).className}`}>
                                        {getTicketStatus(ticket).text}
                                    </span>
                                </td>

                                <td className="p-2">
                                    <button
                                        onClick={() => navigator.clipboard.writeText(ticket.id)}
                                        title="Copy ticket id"
                                    >
                                        <Copy size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}