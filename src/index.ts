import express, { json, Request, Response }  from "express";
import router from "./routers/index-router";
import errorHandler from "./middlewares/error-handler";

const app = express();
app.use(json());

app.get("/health", (req: Request, res: Response) => res.status(200).send("I'm OK!"));

app.use(router);
app.use(errorHandler);

const port = process.env.PORT || 5000

app.listen(port, () => console.log("Server is up!"));