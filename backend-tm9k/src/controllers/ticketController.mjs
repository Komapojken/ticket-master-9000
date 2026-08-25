import express from "express";
import * as ticketService from "../services/ticketService.mjs";

export function createTicket(req, res) {
    const ticket = ticketService.createTicket();

    res.status(201).json(ticket);
}

export function useTicket(req, res) {
    const result = ticketService.useTicket(req.params.id);

    if (!result.success) {
        switch (result.reason) {
            case "notFound":
                return res.status(404).json({ message: "Ticket not found" });

            case "used":
                return res.status(409).json({ message: "Ticket already used" });

            case "deleted":
                return res.status(410).json({ message: "Ticket has been deleted" });
        }
    }

    res.status(200).json(result.ticket);
}

export function deleteTicket(req, res) {
    const result = ticketService.deleteTicket(req.params.id);

    if (!result.success) {
        switch (result.reason) {
            case "notFound":
                return res.status(404).json({ message: "Ticket not found" });

            case "deleted":
                return res.status(409).json({ message: "Ticket has already been deleted" });
        }
    }

    res.status(200).json({ message: "Ticket deleted" });
}

export function getAll(req, res) {
    const result = ticketService.getAll();

    res.status(200).json(result);
}