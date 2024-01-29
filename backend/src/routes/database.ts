import express, { Request, Response } from "express"
import { getDocs, getDoc, doc, collection, getFirestore, updateDoc, arrayUnion } from "firebase/firestore";
import { story } from "../models/story";
import { firebaseApp } from "../firebase";

const router = express.Router()

const db = getFirestore(firebaseApp);

router.get("/", (req: Request, res: Response) => { res.send("Hello") })
router.get("/stories", async (req: Request, res: Response) => {

    const querySnapshot = await getDocs(collection(db, "story"));
    const fetchedStories: story[] = [];
    querySnapshot.forEach((doc: any) => {
        const data = doc.data();
        console.log(data.createdAt);
        let storyEntry: story = {
            id: data.id,
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

router.post("/postStoryEntry", async (req: Request, res: Response) => {
    let id: any = req.query.id;
    let newStoryEntry = req.query.newStoryEntry;
    if (!id) { res.status(400).json({ error: "missing id" }) }
    const docRef = doc(db, 'story', id.toString());
    try {
        await updateDoc(docRef, {
            storyText: arrayUnion(newStoryEntry), // Add value to the array
            // yourArrayField: arrayRemove(valueToRemove), // Remove value from the array
            // If you want to remove a value from the array, uncomment the above line
        });
        console.log("Entered");
        res.end("Updated successfully");
    /* if (docSnap.exists()) {
         const data = docSnap.data();
         return res.status(200).json({ data });
     } else {
         return res.status(404).json({ error: 'Document not found.' });
     }*/} catch (errorMessage) { res.status(400).json({ error: errorMessage }) }

});

module.exports = router;
