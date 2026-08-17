import Database from "better-sqlite3";

const db = new Database("./src/database/tickets.db");

db.prepare(`
CREATE TABLE IF NOT EXISTS Tickets
(
    id TEXT PRIMARY KEY,
    createdAt TEXT NOT NULL,
    usedAt TEXT,
    deletedAt TEXT
)
`).run();

export default db;