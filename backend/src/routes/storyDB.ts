import express, { Request, Response } from "express"
import { getDocs, getDoc, doc, collection, updateDoc, arrayUnion, FieldValue } from "firebase/firestore";
import { db } from "../firebase";
import { story } from "../models/story";
import { user } from "../models/user";
import { firebaseApp } from "../firebase";
import { firestore } from "firebase-admin";
//import { getUserData } from "./userDB";
const router = express.Router()
async function getUserData(uId: string) {
    try {
        console.log("Checking");
        const doc = await db.collection("user").doc(uId).get();
        if (doc.exists) {
            const userData: user = doc.data() as user;
            const { firstName, lastName } = userData;
            console.log("First Name:", firstName);
            console.log("Last Name:", lastName);
            return { firstName, lastName };
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting document:", error);
        return null;
    }
}

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
            genres: data.genres,
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
            genres: data.genres,
            createdAt: data.createdAt.toDate()
        };

        res.json(storyData);
    } catch (error: any) {
        console.error("Error getting document:", error);
        return res.status(500).send("Internal Server Error");
    }
});

router.post("/createNewStory", async (req: Request, res: Response) => {
    const { uId, title, synopsis, genres, firstEntry } = req.body;

    let storyText: string[] = [firstEntry];
    try {
        const response = await getUserData(uId);

        if (response) {
            const { firstName, lastName } = response;

            // Add the story to the 'story' collection
            const storyRef = await db.collection("story").add({
                title: title,
                synopsis: synopsis,
                genres: genres,
                storyText: storyText,
                createdAt: new Date(),
                creator: firstName + " " + lastName
            });

            // Get the ID of the newly created story
            const storyId = storyRef.id;
            console.log(storyId);
            // Update the user document to add the story ID to 'storiesCreated' array
            await db.collection("user").doc(uId).update({
                storiesCreated: firestore.FieldValue.arrayUnion(storyId),
            });

            console.log("Story created and added to user's storiesCreated array");
            return res.status(200).send("Story created successfully");
        } else {
            return res.status(400).send("Error retrieving user data");
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal server error");
    }
});



router.post("/postStoryEntry", async (req: Request, res: Response) => {
    let id: any = req.body.id;
    let newStoryEntry = req.body.newStoryEntry;
    if (!id) { res.status(400).json({ error: "missing id" }) }



    try {
        await db.collection("story").doc(id).update({
            storyText: firestore.FieldValue.arrayUnion(newStoryEntry)
        })
        return res.status(200).send("entry updated");
    } catch (error) {
        return res.status(400).send(error);
    }





});


module.exports = router;
