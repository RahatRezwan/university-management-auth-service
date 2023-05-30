import * as dotenv from "dotenv";
import path from "path";

dotenv.config({
   path: path.resolve(process.cwd(), ".env"),
});

const port = process.env.PORT;
const databaseURL = process.env.DATABASE_URL;

export default {
   port,
   databaseURL,
};
