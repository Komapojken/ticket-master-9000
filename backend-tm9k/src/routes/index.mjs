import express from "express";
import ticketRoutes from "./ticketRoutes.mjs";

const router = express.Router();

// Create ticket
router.use("/tickets", ticketRoutes);

// Use ticket
router.use("/tickets/:id/use", ticketRoutes);

export default router;