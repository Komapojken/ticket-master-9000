import "dotenv/config";
import app from "./app.mjs";
import { createDatabase } from "./database/databaseConfig.mjs";
import { initializeDatabase } from "./services/ticketService.mjs";

// Setting up database
const db = createDatabase("./src/database/tickets.db");
initializeDatabase(db);

// Setting port for server
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Listening on port ", PORT);
});