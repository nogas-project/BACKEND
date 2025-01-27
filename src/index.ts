import express from "express";
import {config} from "./config/config";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "./config/firebase";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

const app = express();

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);


app.use(express.json());
const port = config.PORT;



app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).send("Welcome");
})

app.listen(port, () => {
    console.log("Listening on port", port);
})
