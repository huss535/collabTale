import express, { Request, Response } from "express"
import { db } from "../firebase";
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { user } from "../models/user";
import { bucket } from '../firebase'
const router = express.Router();

export async function getUserData(uId: string) {
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



const retrieveImage = async (uId: string) => {
    try {
        const storageRef = bucket.file(`images/${uId}`);
        const [signedUrl] = await storageRef.getSignedUrl({
            action: "read",
            expires: new Date('2025-12-12') // Set expires to null to indicate no expiration
        });
        return signedUrl;
    } catch (error) {
        console.error("Error generating signed URL:", error);
    }



}
router.get("/", (req: Request, res: Response) => {
    res.send("serveer working");
})
router.post("/newUser", async (req: Request, res: Response) => {
    const { uId, firstName, lastName, username, bio, dateOfBirth } = req.body;
    let profileImage: string = ""
    if (!uId) return res.status(400).send("User Id is missing");
    else {
        let profileImageLink: string | undefined = await retrieveImage(uId);


        if (profileImageLink) { profileImage = profileImageLink; }
        const data: user = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            bio: bio,
            dateOfBirth: dateOfBirth,
            profileImage: profileImageLink

        }



        db.collection('user').doc(uId).set(data)
            .then(docRef => {
                return res.status(200).json({ handle: 'data added successfully' })
            })
    }
});

router.get("/getUserById", async (req: Request, res: Response) => {
    try {
        const uId: string | undefined = req.query.uId as string | undefined;
        if (!uId) return res.status(400).send("User id missing, can't process requst");
        const document = await db.collection("user").doc(uId).get();
        const user = document.data();
        if (!user) res.status(400).send("A user with this id does not exist");
        return res.send(user);
    } catch (error) {
        return res.status(400).send("Error fetching data");
    }

})

router.post("/uploadProfileImage", async (req: Request, res: Response) => {
    try {
        const { uId, imageData } = req.body;

        // const imageRef = ref(storage, `images/${imageName}`)
        const buffer = Buffer.from(imageData, "base64");
        // Upload the image data to Firebase Storage
        //await uploadBytes(imageRef, bytes);
        await bucket.file(`images/${uId}`).save(buffer, {
            metadata: {
                contentType: "image/jpeg" // Specify the content type of the image
            }
        });

        res.send("Profile image uploaded successfully");
    } catch (error: any) {
        res.status(400).send(error);
    }
});

router.post("/updateProfileImage", async (req: Request, res: Response) => {

    const { uId } = req.body;
    const signedUrl = retrieveImage(uId);
    db.collection('user').doc(uId).set({ profileImage: signedUrl })
        .then(docRef => {
            return res.status(200).json({ handle: 'data added successfully' })
        })



})

router.get("/getImageById", async (req: Request, res: Response) => {

    const uId: string | undefined = req.query.uId as string | undefined;
    if (!uId) return res.status(400).send("User id missing, can't process requst");
    try {
        const imageUrl: string | undefined = await retrieveImage(uId);
        if (!imageUrl) return res.status(400).send("Error fetching image")

        return res.send(imageUrl);
    } catch (error) {
        return res.status(400).send(error);
    }

})


module.exports = router;