import express from "express";
import * as ticketService from "../services/ticketService.mjs";

export function createTicket(req, res) {
    const ticket = ticketService.createTicket();

    res.status(201).json(ticket);
}

export function useTicket(req, res) {
    const result = ticketService.useTicket(req.params.id);

    if (!result) {
        return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json({ message: "Ticket used" });
}

export function deleteTicket(req, res) {
    const result = ticketService.deleteTicket(req.params.id);

    if (!result) {
        return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json({ message: "Ticket deleted" });
}

export function getAll(req, res) {
    const result = ticketService.getAll();

    res.status(200).json(result);
}