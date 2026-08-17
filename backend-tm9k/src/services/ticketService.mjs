import crypto from "node:crypto";
import db from "../database/databaseConfig.mjs";

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

    console.log("id", id);
    console.log("usedAt", usedDate);

    const result = db.prepare(`
        UPDATE Tickets
        SET usedAt = ?
        WHERE id = ?
    `).run(usedDate, id);

    console.log(result);

    return result.changes > 0;
}