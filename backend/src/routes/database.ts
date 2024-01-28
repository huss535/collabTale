import express, { Request, Response } from "express"
import { getDocs, collection, getFirestore } from "firebase/firestore";
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

module.exports = router;
