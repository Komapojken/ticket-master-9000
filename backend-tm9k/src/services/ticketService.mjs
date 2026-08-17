import crypto from "node:crypto";
import db from "../database/databaseConfig.mjs";

export async function createTicket() {
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