import express, { Request, Response } from "express"
import { getDocs, getDoc, doc, collection, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import { story } from "../models/story";
import { firebaseApp } from "../firebase";
const router = express.Router()


router.get("/", (req: Request, res: Response) => { res.send("Hello") })
router.get("/stories", async (req: Request, res: Response) => {

    //const querySnapshot = await getDocs(collection(db, "story"));
    const querySnapshot = await db.collection("story").get();
    const fetchedStories: story[] = [];
    querySnapshot.forEach((doc: any) => {
        const data = doc.data();
        console.log(data.createdAt);
        let storyEntry: story = {
            id: doc.id,
            title: data.title,
            synopsis: data.synopsis,
            storyText: data.storyText,
            creator: data.creator,
            categories: data.categories,
            createdAt: data.createdAt.toDate()


        }

        fetchedStories.push(storyEntry);

    })

    res.send(fetchedStories);
})

router.get("/storyById", async (req: Request, res: Response) => {
    const id = req.query.id as string;

    if (!id) {
        return res.status(400).send("Missing ID parameter");
    }

    const docRef = db.collection("story").doc(id);

    try {
        const doc = await docRef.get();

        if (!doc.exists) {
            console.log("No such document!");
            return res.status(404).send("Story not found");
        }

        const data = doc.data();
        if (!data) {
            console.log("Document data is undefined!");
            return res.status(500).send("Internal Server Error");
        }
        const storyData: story = {
            id: id,
            title: data.title,
            synopsis: data.synopsis,
            storyText: data.storyText,
            creator: data.creator,
            categories: data.categories,
            createdAt: data.createdAt.toDate()
        };

        res.json(storyData);
    } catch (error: any) {
        console.error("Error getting document:", error);
        return res.status(500).send("Internal Server Error");
    }
});



router.post("/postStoryEntry", async (req: Request, res: Response) => {
    let id: any = req.body.id;
    let newStoryEntry = req.body.newStoryEntry;
    if (!id) { res.status(400).json({ error: "missing id" }) }



    db.collection("story").doc(id).set({
        storyText: arrayUnion(newStoryEntry)
    })
        .then(() => {
            console.log("Document successfully written!");
            res.end("Updated successfully");

        })
        .catch((error: Error) => {
            console.error("Error writing document: ", error);
            res.status(400).json({ error: error.message })
        });






});


module.exports = router;
