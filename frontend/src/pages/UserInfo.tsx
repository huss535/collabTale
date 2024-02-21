import { FormControl, FormLabel, Input, Box, Button, FormErrorMessage } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { useState } from "react";

interface userInfo {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
}
function UserInfo() {

    const [userInfo, setUserInfo] = useState<userInfo>({
        firstName: '',
        lastName: '',
        dateOfBirth: new Date(),
    })

    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        //  console.log(user);
    } else {
        // No user is signed in.
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;


        setUserInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }));




    };

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
                    <FormLabel>Date of birth</FormLabel>
                    <Input variant='filled' type="date" name="dateOfBirth" onChange={handleChange} />

                </div>
                <Button >Next</Button>
            </FormControl>
        </Box>
    </>);
}
export default UserInfo;