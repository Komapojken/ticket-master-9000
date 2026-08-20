import express from "express";
import apiRoutes from "./routes/index.mjs";
import cors from "cors";

const app = express();

app.use(express.json());

// Origins from env-file
const origins = process.env.CORS_ALLOW_ORIGINS;
// Converting to array
const allowedOrigins = origins.split(',');

const corsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));

// routes
app.use("/", apiRoutes);

export default app;