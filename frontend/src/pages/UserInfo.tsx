import { FormControl, FormLabel, Input, Box, Button, FormErrorMessage } from "@chakra-ui/react";
import axios from "axios";
import { getAuth, updateProfile } from "firebase/auth";
import { MouseEventHandler, useState } from "react";
import { useLocation } from "react-router-dom";

interface userInfo {
    firstName: string;
    lastName: string;
    username: string;
    dateOfBirth: string;
}
function UserInfo() {
    const location = useLocation();
    const uid = location.state;
    console.log(uid);
    const [userInfo, setUserInfo] = useState<userInfo>({
        firstName: '',
        lastName: '',
        username: '',
        dateOfBirth: '',
    })

    const auth = getAuth();
    const user = auth.currentUser;



    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;


        await setUserInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(userInfo);



    };

    const handleSubmission: MouseEventHandler<HTMLButtonElement> = async (e) => {
        if (user) {
            const userData = {
                uId: uid,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                username: userInfo.username,
                dateOfBirth: userInfo.dateOfBirth

            };
            await axios.post(import.meta.env.VITE_API + "/user/newUser", userData).then((response) => {
                console.log(response.data);
            }).catch((error: Error) => {
                console.log(error.message);
            })

        }
        else { console.log("Not authenticated") }

    }

    return (<>
        <Box style={{ backgroundColor: '#FFFFE4', marginTop: 50 }}>
            <FormControl style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '30px' }}>
                <div style={{ width: '300px' }}>
                    <FormLabel>First Name</FormLabel>
                    <Input variant='filled' name="firstName" onChange={handleChange} />
                </div>
                <div style={{ width: '300px' }}>
                    <FormLabel>Last Name</FormLabel>
                    <Input variant='filled' name="lastName" onChange={handleChange} />
                </div>

                <div style={{ width: '300px' }}>
                    <FormLabel>Username</FormLabel>
                    <Input variant='filled' name="username" onChange={handleChange} />
                </div>


                <div style={{ width: '300px' }}>
                    <FormLabel>Date of birth</FormLabel>
                    <Input variant='filled' type="date" name="dateOfBirth" onChange={handleChange} />

                </div>
                <Button onClick={handleSubmission} >Next</Button>
            </FormControl>
        </Box>
    </>);
}
export default UserInfo;