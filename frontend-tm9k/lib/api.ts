const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create ticket
export async function createTicket() {
    const response = await fetch(`${API_URL}/tickets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });

    if (!response.ok) {
        throw new Error("Failed to create ticket");
    }

    return response.json(); 
}

// Use a ticket
export async function useTicket(id: string) {
    const response = await fetch(`${API_URL}/tickets/${id}/use`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to use the ticket");
    }

    return response.json();
}

// Delete a ticket (soft delete)
export async function deleteTicket(id: string) {
    const response = await fetch(`${API_URL}/tickets/${id}/delete`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete the ticket");
    }

    return response.json();
}

// List all tickets
export async function listAllTickets() {
    const response = await fetch(`${API_URL}/tickets`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch all tickets");
    }

    return response.json(); 
}