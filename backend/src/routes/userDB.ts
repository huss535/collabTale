import express, { Request, Response } from "express"
import { getDocs, getDoc, doc, collection, getFirestore, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { user } from "../models/user";
import { firebaseApp } from "../firebase";

const router = express.Router();
const db = getFirestore(firebaseApp);

router.get("/", (req: Request, res: Response) => {
    res.send("serveer working");
})
router.post("/newUser", async (req: Request, res: Response) => {
    const { uId, firstName, lastName, dateOfBirth } = req.body;
    const data = {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth

    }

    try {
        await setDoc(doc(db, "user", uId), data);
        res.send("User added successfuly");
    } catch (error) {
        res.json(error);
    }

});

module.exports = router;