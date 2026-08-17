import express from "express";
import * as ticketController from "../controllers/ticketController.mjs";

const router = express.Router();

// Create ticket admin/user
router.post('/', ticketController.createTicket);

// Use ticket admin/user
router.patch("/", ticketController.useTicket);

export default router;