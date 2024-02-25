import { Button, Flex, Heading } from "@chakra-ui/react";
function ProfilePage() {


    return (

        <Flex>
            <Flex
                direction={'column'}
                justify={'space-between'}
                style={{ backgroundColor: '#B68D40', width: '10%', height: '100vh' }}
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

        </Flex>




    );
}


export default ProfilePage;