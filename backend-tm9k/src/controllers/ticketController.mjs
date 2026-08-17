import express from "express";
import * as ticketService from "../services/ticketService.mjs";

export async function createTicket(req, res) {
    const ticket = await ticketService.createTicket();

    res.status(201).json(ticket);
}