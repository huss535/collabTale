import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Divider, SimpleGrid, HStack, Tag, TagLabel, Stack } from '@chakra-ui/react';
import { db } from '../firebase';
import { story } from '../types';
import { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import DisplayTag from '../components/DisplayTag';
import 'firebase/firestore';


function GuestPage() {

    const [stories, setStories] = useState<story[]>([]);


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

                //console.log(`${doc.id} => ${doc.data()}`);
            });
            setStories(fetchedStories);

        }
        fetch();
        console.log(stories);

    }, [])
    return (

        <div style={{ backgroundColor: '#FFFFE4', display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>

            <SimpleGrid columns={1} spacing={18}>

                {stories.map((story) => {
                    return (

                        <Card style={{ width: '450px' }} boxShadow='xl'>
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
                            <CardFooter textAlign='center'>
                                Written by: {story.creator}
                            </CardFooter>
                        </Card>

                    );
                })}
            </SimpleGrid>
        </div>
    );
}

export default GuestPage;
