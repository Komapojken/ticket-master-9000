import express from "express";
import ticketRoutes from "./ticketRoutes.mjs";

const router = express.Router();

router.use("/tickets", ticketRoutes);

export default router;