import { IconButton, Card, CardHeader, CardBody, CardFooter, Heading, Text, Divider, SimpleGrid, Button, Stack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import { db } from '../firebase';
import { story } from '../types';
import { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import DisplayTag from '../components/DisplayTag';
import { useNavigate } from 'react-router-dom';
import 'firebase/firestore';


function GuestPage() {

    const [stories, setStories] = useState<story[]>([]);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const fetch = async () => {
            const querySnapshot = await getDocs(collection(db, "story"));
            const fetchedStories: story[] = [];
            querySnapshot.forEach((doc: any) => {
                const data = doc.data();
                console.log(data.createdAt);
                let storyEntry: story = {
                    id: data.id,
                    title: data.title,
                    synopsis: data.synopsis,
                    storyText: data.storyText,
                    creator: data.creator,
                    categories: data.categories,
                    createdAt: data.createdAt.toDate()


                }

                fetchedStories.push(storyEntry);

            });
            setStories(fetchedStories);

        }
        fetch();
        console.log(stories);

    }, [])


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

                {stories.map((story) => {
                    return (

                        <Card style={{
                            border: 'solid',
                            borderWidth: '3px',
                            width: '450px',
                            borderRadius: '12px',
                            borderColor: "#B68D40"
                        }}
                            boxShadow='xl'>

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

                    );
                })}
            </SimpleGrid>
        </div>
    );
}

export default GuestPage;
