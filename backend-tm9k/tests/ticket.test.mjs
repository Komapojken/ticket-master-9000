import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.mjs";
import { createDatabase } from "../src/database/databaseConfig.mjs";
import { initializeDatabase } from "../src/services/ticketService.mjs";

const testDb = createDatabase(":memory:");
initializeDatabase(testDb);

describe("Tickets", () => {

    it("should create a ticket", async () => {

        const response = await request(app)
            .post("/tickets")
            .send({});

        expect(response.status).toBe(201);
    });
});