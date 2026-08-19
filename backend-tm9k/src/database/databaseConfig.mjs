import Database from "better-sqlite3";

export function createDatabase(filename) {
    const db = new Database(filename);

    db.prepare(`
    CREATE TABLE IF NOT EXISTS Tickets
    (
        id TEXT PRIMARY KEY,
        createdAt TEXT NOT NULL,
        usedAt TEXT,
        deletedAt TEXT
    )
    `).run();

    return db;
}