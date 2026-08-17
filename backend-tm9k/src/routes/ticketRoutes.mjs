import express from "express";
import * as ticketController from "../controllers/ticketController.mjs";

const router = express.Router();

// user endpoints

// 
router.post('/', ticketController.createTicket);

export default router;