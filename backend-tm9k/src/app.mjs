import express from "express";
import apiRoutes from "./routes/index.mjs";

const app = express();

app.use(express.json());

// routes
app.use("/", apiRoutes);

export default app;