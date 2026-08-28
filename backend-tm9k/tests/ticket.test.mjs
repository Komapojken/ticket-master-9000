import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.mjs";
import crypto from "node:crypto";
import { createDatabase } from "../src/database/databaseConfig.mjs";
import { initializeDatabase } from "../src/services/ticketService.mjs";

// Configure a new inmemory database for each test

beforeEach(() => {
    initializeDatabase(createDatabase(":memory:"));
});

// Tests

describe("Tickets", () => {

    it("should create a ticket", async () => {

        const response = await request(app)
            .post("/tickets")
            .send({});

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
            usedAt: null,
            deletedAt: null,
        });
        expect(response.body.id).toBeDefined();
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
        expect(response.body.id).toBe(id);
        expect(response.body.usedAt).not.toBeNull();
        expect(response.body.deletedAt).toBeNull();
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
        expect(response.body.id).toBe(id);
        expect(response.body.deletedAt).not.toBeNull();
    });

    it("should delete a used ticket (soft-delete)", async () => {

        const ticketResponse = await request(app)
            .post("/tickets")
            .send({});

        const id = ticketResponse.body.id;

        await request(app)
            .patch(`/tickets/${id}/use`)
            .send({});

        const response = await request(app)
            .patch(`/tickets/${id}/delete`)
            .send({});

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(id);
        expect(response.body.usedAt).not.toBeNull();
        expect(response.body.deletedAt).not.toBeNull();
    });

    it("should return 404 if ticket does not exist when deleting a ticket (soft-delete)", async () => {

        const id = crypto.randomUUID();

        const response = await request(app)
            .patch(`/tickets/${id}/delete`)
            .send({});

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "Ticket not found" });
    });

    it("should not delete a ticket already deleted (soft-delete)", async () => {

        const ticketResponse = await request(app)
            .post("/tickets")
            .send({});

        const id = ticketResponse.body.id;

        await request(app)
            .patch(`/tickets/${id}/delete`)
            .send({});

        const response = await request(app)
            .patch(`/tickets/${id}/delete`)
            .send({});

        expect(response.status).toBe(409);
        expect(response.body).toEqual({ message: "Ticket has already been deleted" });
    });

    it("should return all the tickets", async () => {

        for (let i = 0; i < 10; i++) {
            await request(app)
                .post("/tickets")
                .send({});
        }

        const response = await request(app)
            .get("/tickets")
            .send({});

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(10);
    });
});
