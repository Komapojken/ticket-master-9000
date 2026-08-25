"use client";

import { useState, useEffect } from "react";
import CreateTicketView from "./CreateTicketView";
import ListAllTicketsView from "./ListAllTicketsView";
import UseTicketView from "./UseTicketView";
import DeleteTicketView from "./DeleteTicketView";
import {
    Plus,
    Ticket,
    Trash2,
    List,
    User,
    Shield
} from "lucide-react";

export default function TicketApp() {
    const [view, setView] = useState("create");
    const [role, setRole] = useState("user");

    const activeMenuButton = "flex-1 flex items-center justify-center gap-2 border rounded px-4 py-2 bg-blue-100 border-blue-500";
    const normalMenuButton = "flex-1 flex items-center justify-center gap-2 border rounded px-4 py-2 hover:bg-gray-100";
    
    const quotes = [
        "Death and destruction to ignorance.",
        "Ignorance is the root cause to all failure.",
        "If knowledge does not prevail, ignorance will be victorious.",
        "Asking questions is the path to less ignorance.",
        "Only the ignorant persist in their lack of knowledge.",
    ];

    const [quote, setQuote] = useState("");

    useEffect(() => {
        setQuote(
            quotes[Math.floor(Math.random() * quotes.length)]
        );
    }, []);

    return (
        <>
            <div className="max-w-4xl w-full mx-auto mt-4 border rounded-xl flex flex-col">
                <header>
                    <div className="flex justify-between items-start pr-6 pl-6 pb-3 pt-3">
                        <h1 className="text-4xl font-bold tracking-tight">
                            Ticket Master 9000
                        </h1>

                        <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-gray-500">
                                Roles
                            </span>

                            <button
                                onClick={() => setRole("user")}
                                className={
                                    role === "user"
                                        ? "flex-1 flex items-center justify-center gap-2 border px-2 py-1 text-sm rounded bg-blue-100 border-blue-500"
                                        : "flex-1 flex items-center justify-center gap-2 border px-2 py-1 text-sm rounded hover:bg-gray-100"
                                }
                            >
                                <User size={16} />
                                User
                            </button>

                            <button
                                onClick={() => setRole("admin")}
                                className={
                                    role === "admin"
                                        ? "flex-1 flex items-center justify-center gap-2 border px-2 py-1 text-sm rounded bg-blue-100 border-blue-500"
                                        : "flex-1 flex items-center justify-center gap-2 border px-2 py-1 text-sm rounded hover:bg-gray-100"
                                }
                            >
                                <Shield size={16} />
                                Admin
                            </button>
                        </div>
                    </div>

                    <nav className="border-t pt-3 px-6 flex gap-4">
                        <button
                            className={view === "create" ? activeMenuButton : normalMenuButton}
                            onClick={() => setView("create")}
                        >
                            <Plus size={18} />
                            Create ticket
                        </button>

                        <button
                            className={view === "use" ? activeMenuButton : normalMenuButton}
                            onClick={() => setView("use")}
                        >
                            <Ticket size={18} />
                            Use ticket
                        </button>

                        {role === "admin" && (
                            <button
                                className={view === "delete" ? activeMenuButton : normalMenuButton}
                                onClick={() => setView("delete")}
                            >
                                <Trash2 size={18} />
                                Delete ticket
                            </button>
                        )}

                        {role === "admin" && (
                            <button
                                className={view === "list" ? activeMenuButton : normalMenuButton}
                                onClick={() => setView("list")}
                            >
                                <List size={18} />
                                List tickets
                            </button>
                        )}                        
                    </nav>
                </header>

                <main className="min-h-[530px] border rounded-lg p-8 mx-6 mt-3">
                    {view === "create" && (
                        <CreateTicketView />
                    )}

                    {view === "use" && (
                        <UseTicketView />
                    )}

                    {view === "delete" && (
                        <DeleteTicketView />
                    )}

                    {view === "list" && (
                        <ListAllTicketsView />
                    )}
                </main>

                <footer className="border-t my-6 px-6 py-4 flex justify-between items-center">
                    <p className="italic text-gray-500">
                        CourseBot: "{quote}"
                    </p>
                    <p>
                        © 2026 Robban | Next.js + Express
                    </p>
                </footer>
            </div>
        </>
    );
}