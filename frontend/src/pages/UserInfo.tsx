import { FormControl, FormLabel, Input, Box, Button, Card, CardBody, CardHeader, Divider, Heading } from "@chakra-ui/react";
import axios from "axios";
import { getAuth, updateProfile } from "firebase/auth";
import { MouseEventHandler, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";

interface userInfo {
    uId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
}
function UserInfo() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState<userInfo>({
        uId: user,
        firstName: '',
        lastName: '',
        dateOfBirth: '',

    })





    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;


        if (name != "profilePicture") {
            await setUserInfo((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
        console.log(userInfo);



    };

    const handleSubmission: MouseEventHandler<HTMLButtonElement> = async (e) => {
        //console.log(userInfo);
        navigate("/ProfileInfo", { state: userInfo });
        /*  if (user) {
              const userData = {
                  uId: uid,
                  firstName: userInfo.firstName,
                  lastName: userInfo.lastName,
                  username: userInfo.username,
                  dateOfBirth: userInfo.dateOfBirth
  
              };
  
              //await axios.post(import.meta.env.VITE_API + "/user/newUser", userData).then((response) => {
              //   console.log(response.data);
              
              // }).catch((error: Error) => {
              //    console.log(error.message);
              //  })
  
          }
          else { console.log("Not authenticated") }*/

    }

    return (<>
        <div style={{ height: '100vh', backgroundColor: '#FFFFE4', marginTop: '100px' }}>
            <Card style={{ margin: 'auto', alignContent: 'center', width: '60vw', borderRadius: '10px' }}>

                <CardHeader >
                    <Heading textAlign="center" as="h1" size='xl'>User Info</Heading>
                </CardHeader>
                <Divider />
                <CardBody>
                    <FormControl style={{ height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div >
                            <FormLabel>First Name</FormLabel>
                            <Input variant='filled' name="firstName" onChange={handleChange} />
                        </div>
                        <div >
                            <FormLabel>Last Name</FormLabel>
                            <Input variant='filled' name="lastName" onChange={handleChange} />
                        </div>



                        <div >
                            <FormLabel>Date of birth</FormLabel>
                            <Input variant='filled' type="date" name="dateOfBirth" onChange={handleChange} />

                        </div>



                        <Divider />
                        <Button _hover={{ borderColor: "#d9c193" }} onClick={handleSubmission} >Next</Button>
                    </FormControl>
                </CardBody>
            </Card>
        </div>
    </>);
}
export default UserInfo;