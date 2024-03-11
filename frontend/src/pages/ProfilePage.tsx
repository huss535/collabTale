import { Button, Flex, Heading, Card, CardBody, CardHeader, Avatar, Text, Spinner, Link, Divider } from "@chakra-ui/react";
import axios from "axios";
import { user } from '../types';
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./CardsStyle.css"

function ProfilePage() {
    const uId: string | null = localStorage.getItem('userId');
    const [userData, setUserData] = useState<user | null>(null); // State to store user data
    const fullName: string = userData?.firstName + " " + userData?.lastName;

    useEffect(() => {
        const fetchUserData = async (uId: string) => {
            try {
                const response = await axios.get(import.meta.env.VITE_API + "/user/getUserById", { params: { uId: uId } });
                if (response.status !== 200) {
                    throw new Error("Error processing your information");
                } else {
                    return response.data;
                }
            } catch (error) {
                alert(error);
                return null;
            }
        };

        if (uId) {
            fetchUserData(uId)
                .then(data => setUserData(data))
                .catch(error => console.error(error));
        }
    }, [uId]); // Fetch user data whenever uId changes

    if (!userData) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
            <Spinner />
        </div>
            ;
    }

    return (

        <Flex>
            <Navbar />

            <Flex
                pb='50px'
                ml={{ base: '100px', lg: '200px' }}
                className="inner-container"
            >

                <Card className="card-styling">
                    <CardHeader>
                        <Avatar size="2xl" name={fullName} src={userData.profileImage} style={{ border: "solid", borderColor: '#B68D40' }} />
                    </CardHeader>
                    <Divider />

                    <CardBody>
                        <Heading as="h1" fontSize={['20px', '30px', '40px']}>{userData.firstName + " " + userData.lastName}</Heading>
                        <Heading as="h2" fontSize={['13px', '15px', '25px']}  >{userData.username}</Heading>
                    </CardBody>
                </Card>

                <Card className="card-styling">
                    <CardHeader className="card-header">
                        <Heading as='h3' size="md" >Bio</Heading>
                    </CardHeader>
                    <Divider />
                    <CardBody >
                        <Text style={{ overflowY: 'auto' }} >{userData.bio}</Text>
                    </CardBody>
                </Card>



                { /*  <Flex style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-around', gap: "20px", width: '70%', flexWrap: 'wrap' }}>
                    <Button _hover={{ borderColor: "#d9c193" }} >Your Activity</Button>
                    <Button _hover={{ borderColor: "#d9c193" }} >Favourite Stories</Button>
                    <Button _hover={{ borderColor: "#d9c193" }} >Edit Profile</Button>

                </Flex>
    */}

            </Flex>


        </Flex>




    );
}


export default ProfilePage;