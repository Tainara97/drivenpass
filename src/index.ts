import express, { json, Request, Response }  from "express";
import router from "./routers/index-router";

const app = express();
app.use(json());

app.get("/health", (req: Request, res: Response) => res.sendStatus(200));

app.use(router);

const port = process.env.PORT || 5000

app.listen(port, () => console.log("Server is up!"));