import { Box, Button, Card, FormControl, FormLabel, Input, Textarea, CardBody, CardFooter, CardHeader, Heading, Divider, Flex } from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ref } from 'firebase/storage';
import './CardsStyle.css'
import axios from "axios";

function ProfileInfo() {
    const hiddenImageComponent = useRef<HTMLInputElement>(null);
    const { state } = useLocation();
    const [imageData, SetImageData] = useState("")
    const [userName, setUserName] = useState("");
    const [bio, setBio] = useState("");

    let userData = state;


    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === "bio") setBio(value);
        else setUserName(value);

    }





    const fileButtonHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
        if (hiddenImageComponent.current) {
            hiddenImageComponent.current.click();
        } else {
            alert("Something is wrong?");
        }
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (e.target && e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                    const base64Data = (reader.result as string).split(',')[1]; // Extract base64 data without prefix
                    SetImageData(base64Data);
                };
                reader.readAsDataURL(file);
            }

        } catch (error) {
            console.error('Error setting profile picture:', error);
        }

    }

    const handleSubmission: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        userData['username'] = userName;
        userData.bio = bio;
        userData.profileImage = imageData;

        try {
            //const response = await axios.post(import.meta.env.VITE_API + "/user/newUser", userData);
            if (imageData !== "") await axios.post(import.meta.env.VITE_API + "/user/uploadProfileImage", { uId: userData.uId, imageData: imageData });
            await axios.post(import.meta.env.VITE_API + "/user/newUser", userData);

        } catch (error: any) {
            console.error(error.message);
        }
    };



    return (
        <div style={{ height: '100vh', backgroundColor: '#FFFFE4', marginTop: '100px' }}>
            <Card style={{ margin: 'auto', alignContent: 'center', width: '60vw', borderRadius: '10px' }}>
                <CardHeader >
                    <Heading textAlign="center" as="h1" size='xl'>Profile info</Heading>
                </CardHeader>
                <Divider />
                <CardBody>
                    <FormControl style={{ height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>

                        <div>
                            <FormLabel textAlign='center'>Username</FormLabel>
                            <Input variant='filled' name="userName" onChange={handleChange} />
                        </div>

                        <div>
                            <FormLabel textAlign='center' >Bio</FormLabel>
                            <Textarea resize="none" variant='filled' placeholder="Tell everyone about yourself" name="bio" onChange={handleChange} />
                        </div>
                        <div>
                            <Input
                                type="file"
                                name="profilePicture"
                                ref={hiddenImageComponent}
                                style={{ display: "none" }} // Hide the input visually
                                onChange={handleImageUpload}
                            />
                            <Button onClick={fileButtonHandler}>Choose File</Button>
                        </div>
                        <Divider />
                        <Button onClick={handleSubmission}>Next</Button>
                    </FormControl>
                </CardBody>
            </Card>
        </div>
    );
}

export default ProfileInfo;
