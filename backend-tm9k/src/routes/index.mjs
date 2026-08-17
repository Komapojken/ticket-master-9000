import express from "express";
import ticketRoutes from "./ticketRoutes.mjs";

const router = express.Router();

// Tickets
router.use("/tickets", ticketRoutes);

export default router;