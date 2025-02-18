import express from "express";
import { config } from "./config/config";
// import {initializeApp} from "firebase/app";
// import {firebaseConfig} from "./config/firebase";
// import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
// import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';
// import admin from "firebase-admin";
import { MUser } from "./model/user.model";
import db from "./util/database.util";
import userRoute from "./route/user.route";
import gasRoute from "./route/gas.route";
import contactRoute from "./route/contact.route";
import {sendEmail} from "./util/email.util";
// import { getFirebaseAdmin } from "./util/firebaseSDK";
import cors from "cors";
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
// Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);

// Firebase Admin Service Account
// Path in .env should look like this if you have the file in the root dir
// (e.g SERVICE_ACCOUNT_PATH=../../nogas-12f19-firebase-adminsdk-fbsvc-9b30180fd6.json)
// const serviceAccount = getFirebaseAdmin()
//
// // Initialize Firebase Admin
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });
// const db = getFirestore();
// async function testAddDoc() {
//     const docRef = db.collection('User').doc('test');
//
//     // https://stackoverflow.com/questions/52221578/firestore-doesnt-support-javascript-objects-with-custom-prototypes
//     const hc = new MUser("janeTest", "doe", "email", "hashed", "555", false)
//     await docRef.set(JSON.parse(JSON.stringify(hc)));
// }
// testAddDoc();

// async function testGetDoc() {
//     const snapshot = await db.collection('User').get();
//     snapshot.forEach((doc) => {
//       console.log(doc.id, '=>', doc.data());
//     });
// }
// testGetDoc();

app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).send("Welcome");
})

export let server = app.listen(port, () => {
    console.log("Listening on port", port);
    console.log("Environment: " + config.ENV);
})
export default app;