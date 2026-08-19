import { describe, it, expect } from "vitest";
import { beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.mjs";
import crypto from "node:crypto";
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

    it("should use a valid ticket", async () => {

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

    it("should return 404 if ticket does not exist", async () => {

        const id = crypto.randomUUID();

        const response = await request(app)
            .patch(`/tickets/${id}/use`)
            .send({});

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "Ticket not found" });
    });

    it("should not be able to be use a ticket twice", async () => {

        const ticketResponse = await request(app)
            .post("/tickets")
            .send({});

        const id = ticketResponse.body.id;

        await request(app)
            .patch(`/tickets/${id}/use`)
            .send({});

        const response = await request(app)
            .patch(`/tickets/${id}/use`)
            .send({});

        expect(response.status).toBe(409);
        expect(response.body).toEqual({ message: "Ticket already used" });
    });

    it("should not be able to be use a deleted ticket", async () => {

        const ticketResponse = await request(app)
            .post("/tickets")
            .send({});

        const id = ticketResponse.body.id;

        await request(app)
            .patch(`/tickets/${id}/delete`)
            .send({});

        const response = await request(app)
            .patch(`/tickets/${id}/use`)
            .send({});

        expect(response.status).toBe(410);
        expect(response.body).toEqual({ message: "Ticket has been deleted" });
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