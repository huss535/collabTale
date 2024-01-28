import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Divider, SimpleGrid, Button, Stack } from '@chakra-ui/react';
import { story } from '../types'; // Assuming you have a 'types' file with the story type defined
import DisplayTag from '../components/DisplayTag';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'firebase/firestore'; // Not sure if this import is necessary here

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

    return (
        <div style={{
            backgroundColor: '#FFFFE4',
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
        }}>
            <SimpleGrid columns={1} spacing={18}>
                {stories.map((story) => (
                    <Card key={story.id} style={{ // Assuming each story has a unique 'id'
                        border: 'solid',
                        borderWidth: '3px',
                        width: '450px',
                        borderRadius: '12px',
                        borderColor: "#B68D40"
                    }} boxShadow='xl'>
                        <CardHeader color="#B68D40" textAlign='center'>
                            <Heading>{story.title}</Heading>
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
            </SimpleGrid>
        </div>
    );
}

export default GuestPage;
