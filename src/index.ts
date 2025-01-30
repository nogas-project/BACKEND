import express from "express";
import { config } from "./config/config";
// import {initializeApp} from "firebase/app";
// import {firebaseConfig} from "./config/firebase";
// import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';
import admin from "firebase-admin";
import serviceAccount from "../nogas-12f19-firebase-adminsdk-fbsvc-9b30180fd6.json";
import { MUser } from "./model/user.model";

const port = config.PORT;
const app = express();
app.use(express.json());

// Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);

// Initialize Firebase Admin
admin.initializeApp({
    // @ts-ignore
    credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

async function testAddDoc() {
    const docRef = db.collection('User').doc('hc');

    // await docRef.set({
    //     first: 'Ada',
    //     last: 'Lovelace',
    //     born: 1815
    // });

    // https://stackoverflow.com/questions/52221578/firestore-doesnt-support-javascript-objects-with-custom-prototypes
    const hc = new MUser("john", "doe", "email", "hashed", "555", false)
    await docRef.set(JSON.parse(JSON.stringify(hc)));
}
testAddDoc();

app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).send("Welcome");
})

app.listen(port, () => {
    console.log("Listening on port", port);
})
