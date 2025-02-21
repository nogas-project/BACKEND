import express from "express";
import { config } from "./config/config";
import userRoute from "./route/user.route";
import gasRoute from "./route/gas.route";
import contactRoute from "./route/contact.route";
import authRoute from "./route/auth.route";
import cors from "cors";
import emailRoute from "./route/email.route";

const port = config.PORT;
const app = express();

let corsOptions = {
    origin: 'http://localhost:3000',
}

app.use(cors(corsOptions));
app.use(express.json());
app.use("/", userRoute);
app.use("/", gasRoute);
app.use("/", contactRoute);
app.use("/", emailRoute)
app.use("/", authRoute)

export let server = app.listen(port, () => {
    console.log("Listening on port", port);
    console.log("Environment: " + config.ENV);
})
export default app;