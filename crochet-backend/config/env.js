// Loads .env immediately. Imported FIRST in server.js so all other
// modules (services, controllers) can safely read process.env.
import dotenv from "dotenv";
dotenv.config();