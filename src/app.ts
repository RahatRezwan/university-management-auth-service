import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();

/* Middleware */
app.use(cors());
/* parser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* testing route */
app.get("/", (req: Request, res: Response) => {
   res.send("Hello World!");
});

export default app;
