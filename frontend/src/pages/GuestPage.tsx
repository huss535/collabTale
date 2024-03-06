import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Divider, SimpleGrid, Button, Stack, Flex } from '@chakra-ui/react';
import { story } from '../types'; // Assuming you have a 'types' file with the story type defined
import DisplayTag from '../components/DisplayTag';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import 'firebase/firestore'; // Not sure if this import is necessary here
import './CardsStyle.css'

function GuestPage() {
    const [stories, setStories] = useState<story[]>([]);
    const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false); // Ensure correct initialization

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(import.meta.env.VITE_API + "/firestore/stories")
            .then((response) => {
                setStories(response.data);
            })
            .catch((error) => {
                console.error("Error fetching stories:", error);
            });
    }, []); // Empty dependency array to run only once on component mount

    console.log(stories); // Move this inside useEffect or remove it from here

    const handleButtonClick = (storyOpened: story) => {
        // Toggle the click state
        setIsButtonClicked(!isButtonClicked);
        navigate('/DisplayStory', { state: { storyOpened } });
    };

    return (<Flex>

        <Navbar />
        <Flex pb='50px'
            ml={{ base: '95px', lg: '200px' }} // Adjust margin based on screen size
            className='inner-container'
        >
            {stories.map((story) => (
                <Card key={story.id}
                    className='card-styling'
                    boxShadow='xl'>
                    <CardHeader
                        className="card-header"
                        textAlign='center'
                    >
                        <Heading
                            fontSize={['20px', '30px', '40px']}

                        >
                            {story.title}
                        </Heading>
                    </CardHeader>
                    <Divider />
                    <Stack spacing={5} align='center'>
                        <CardBody textAlign='center'>
                            <Text>{story.synopsis}</Text>
                        </CardBody>
                        <DisplayTag categories={story.categories} />
                    </Stack>
                    <CardFooter style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} textAlign='center'>
                        <Text>Written by: <br /> {story.creator} </Text>
                        <Button
                            onClick={() => { handleButtonClick(story) }}
                            colorScheme='yellow'
                            variant='outline'
                            _hover={{ borderColor: "#d9c193" }}
                        >Explore</Button>
                    </CardFooter>
                </Card>
            ))}
        </Flex>
    </Flex>
    );
}

export default GuestPage;
