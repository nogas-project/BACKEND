import express from "express";
import {config} from "./config/config";

const app = express();
const port = config.PORT;

app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).send("Welcome");
})

app.listen(port, () => {
    console.log("Listening on port", port);
})
