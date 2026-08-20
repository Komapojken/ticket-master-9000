"use client";

import { useState } from "react";

export default function TicketApp() {

    function createTicket() {
        console.log("Clicked");
    }

    return (
        <main>
            <h1>Ticket Master 9000</h1>

            <button className="border px-4 py-2 rounded hover:bg-gray-100"
                onClick={createTicket}
            >
                Create ticket
            </button>

            <button className="border px-4 py-2 rounded hover:bg-gray-100"
                onClick={createTicket}
            >
                Use ticket
            </button>

            <button className="border px-4 py-2 rounded hover:bg-gray-100"
                onClick={createTicket}
            >
                Delete ticket
            </button>

            <button className="border px-4 py-2 rounded hover:bg-gray-100"
                onClick={createTicket}
            >
                List tickets
            </button>
        </main>
    );
}