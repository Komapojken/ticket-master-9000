import crypto from "node:crypto";

let db;

export function initializeDatabase(database) {
    db = database;
}

export function createTicket() {
    const ticket = {
        "id" : crypto.randomUUID(),
        "createdAt" : new Date().toISOString(),
        "usedAt" : null,
        "deletedAt" : null
    };

    db.prepare(`
        INSERT INTO Tickets
        (id, createdAt, usedAt, deletedAt)
        VALUES (?, ?, ?, ?)    
    `).run(ticket.id, ticket.createdAt, ticket.usedAt, ticket.deletedAt);

    return ticket;
}

export function useTicket(id) {
    const usedDate = new Date().toISOString();

    const ticket = db.prepare(`
        SELECT usedAt, deletedAt
        FROM Tickets
        WHERE id = ?
    `).get(id);

    if(ticket === undefined) {
        return { success: false, reason: "notFound" };
    }

    if(ticket.usedAt != null) {
        return { success: false, reason: "used" };
    }

    if(ticket.deletedAt != null) {
        return { success: false, reason: "deleted"};
    }

    const result = db.prepare(`
        UPDATE Tickets
        SET usedAt = ?
        WHERE id = ?
    `).run(usedDate, id);

    const updatedTicket = db.prepare(`
        SELECT *
        FROM Tickets
        WHERE id = ?
    `).get(id);

    return {
        success: true,
        ticket: updatedTicket,
    };
}

export function deleteTicket(id) {
    const deletedDate = new Date().toISOString();

    const ticket = db.prepare(`
        SELECT usedAt, deletedAt
        FROM Tickets
        WHERE id = ?
    `).get(id);

    if(ticket === undefined) {
        return { success: false, reason: "notFound" };
    }

    if(ticket.deletedAt != null) {
        return { success: false, reason: "deleted"};
    }

    const result = db.prepare(`
        UPDATE Tickets
        SET deletedAt = ?
        WHERE id = ?
    `).run(deletedDate, id);

    const deletedTicket = db.prepare(`
        SELECT *
        FROM Tickets
        WHERE id = ?
    `).get(id);

    return {
        success: true,
        ticket: deletedTicket,
    };
}

export function getAll() {
    const tickets = db.prepare(`
        SELECT * FROM Tickets    
    `).all();

    return tickets;
}