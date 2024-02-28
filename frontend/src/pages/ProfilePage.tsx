import { Button, Flex, Heading, Card, CardBody, CardHeader, Avatar, Text } from "@chakra-ui/react";
import { useRef } from "react";
import { useLayoutEffect } from "react";
function ProfilePage() {

    return (

        <Flex>
            <Flex
                direction={'column'}
                justify={'space-between'}
                style={{ backgroundColor: '#B68D40', width: '17%', height: '100vh' }}
            >
                <div style={{ textAlign: 'center', padding: '10px' }}>
                    <Heading size='md'>Collab Tale</Heading>
                </div>
                <Button _hover={{ borderColor: "#B68D40" }} style={{ backgroundColor: 'inherit', borderRadius: '0' }} >Home</Button>
                <Button style={{ backgroundColor: 'inherit' }} >Profile</Button>
                <Button style={{ backgroundColor: 'inherit' }} >Genres</Button>
                <Button style={{ backgroundColor: 'inherit' }} >Add Story</Button>
                <Button style={{ backgroundColor: 'inherit' }} >Log out</Button>


            </Flex>

            <Flex style={{ flexDirection: 'column', gap: '60px', alignItems: 'center', width: '100%' }}>

                <Card style={{ flexDirection: "row", justifyContent: 'flex-start', width: '80%', height: '150px', gap: "30%", padding: "25px", margin: '20px' }}>
                    <Avatar size="xl" name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                    <div style={{ width: '70%', maxHeight: '130px' }}>
                        <Heading as="h1" fontSize={['20px', '30px', '40px']}>Eric shulz</Heading>
                        <Heading as="h2" fontSize={['13px', '15px', '25px']} >Eric shulz</Heading>
                    </div>

                </Card>

                <Card style={{ flexDirection: 'column', width: '80%', textAlign: 'center' }}>
                    <CardHeader style={{
                        backgroundColor: '#B68D40',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,

                    }}>
                        <Heading as='h3' size="md" >Bio</Heading>
                    </CardHeader>
                    <CardBody >
                        <Text style={{ overflowY: 'auto' }} >"I want readers to know I'm a real person with a story," she explains when asked about her bio. "If I have similar hobbies and interests as them, I may have the same concerns, too. So, they'll know I'm just as invested in these topics as they are."</Text>
                    </CardBody>
                </Card>



                <Flex style={{ flexDirection: 'row', justifyContent: 'space-between', width: '70%' }}>
                    <Button>Your Activity</Button>
                    <Button>Favourite Stories</Button>
                    <Button>Edit Profile</Button>

                </Flex>
            </Flex>

        </Flex>




    );
}


export default ProfilePage;