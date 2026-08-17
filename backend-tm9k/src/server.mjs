import app from "./app.js";
import "dotnev/config";

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
    console.log("Running...");
});