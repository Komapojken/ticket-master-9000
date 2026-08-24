"use client";

import { useState } from "react";
import CreateTicketView from "./CreateTicketView";
import ListAllTicketsView from "./ListAllTicketsView";
import UseTicketView from "./UseTicketView";
import DeleteTicketView from "./DeleteTicketView";

export default function TicketApp() {
    const [view, setView] = useState("create");
    
    function onButtonClicked() {
        console.log("Clicked");
    }

    return (
        <>
            <header>
                <div>
                    <h1>Ticket Master 9000</h1>

                    <button className="border px-4 py-2 rounded hover:bg-gray-100"
                    onClick={onButtonClicked}
                    >
                        User
                    </button>

                    <button className="border px-4 py-2 rounded hover:bg-gray-100"
                    onClick={onButtonClicked}
                    >
                        Admin
                    </button>
                </div>

                <nav>
                    <button className="border px-4 py-2 rounded hover:bg-gray-100"
                        onClick={() => setView("create")}
                    >
                        Create ticket
                    </button>

                    <button className="border px-4 py-2 rounded hover:bg-gray-100"
                        onClick={() => setView("use")}
                    >
                        Use ticket
                    </button>

                    <button className="border px-4 py-2 rounded hover:bg-gray-100"
                        onClick={() => setView("delete")}
                    >
                        Delete ticket
                    </button>

                    <button className="border px-4 py-2 rounded hover:bg-gray-100"
                        onClick={() => setView("list")}
                    >
                        List tickets
                    </button>
                </nav>
            </header>

            <main>
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

            <footer>

            </footer>
        </>
    );
}