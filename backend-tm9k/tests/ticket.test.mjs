import { describe, it, expect } from "vitest";
import { beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.mjs";
import { createDatabase } from "../src/database/databaseConfig.mjs";
import { initializeDatabase } from "../src/services/ticketService.mjs";

// Configure a new inmemory database for each test
let testDb;

beforeEach(() => {
    testDb = createDatabase(":memory:");
    initializeDatabase(testDb);
});

describe("Tickets", () => {

    it("should create a ticket", async () => {

        const response = await request(app)
            .post("/tickets")
            .send({});

        expect(response.status).toBe(201);
    });

    it("should use a ticket", async () => {

        const ticketResponse = await request(app)
            .post("/tickets")
            .send({});

        const id = ticketResponse.body.id;

        const response = await request(app)
            .patch(`/tickets/${id}/use`)
            .send({});

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Ticket used" });
    });

    it("should delete a ticket (soft-delete)", async () => {

        const ticketResponse = await request(app)
            .post("/tickets")
            .send({});

        const id = ticketResponse.body.id;

        const response = await request(app)
            .patch(`/tickets/${id}/delete`)
            .send({});

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Ticket deleted" });
    });

    it("should return all the tickets", async () => {let testTickets = [];

        for(let i = 0; i < 10; i++)
        {
            await request(app)
                .post("/tickets")
                .send({});
        };

        const response = await request(app)
            .get("/tickets")
            .send({});

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(10);
    });
});