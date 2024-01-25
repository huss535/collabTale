import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Heading, Card, CardBody, Text, CardFooter, Divider, IconButton, AbsoluteCenter, Box } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'
import { story } from '../types';
function StoryDisplay() {
    const { state } = useLocation();
    const { storyOpened }: { storyOpened: story } = state;
    let count: number = 0;
    return (<div style={{

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        gap: '150px'
    }}>
        <Heading as='h1' size='2xl' textAlign='center'>
            {storyOpened.title}
            <Heading as='h2' size='md'>
                Created by: {storyOpened.creator}
            </Heading>
        </Heading>
        <Card
            style={{
                border: 'solid',
                borderWidth: '3px',
                width: '450px',
                borderRadius: '12px',
                borderColor: "#B68D40"
            }}


        >

            <CardBody>
                {storyOpened.storyText.map((section: string) => {
                    count += 1;
                    return (<>
                        <Box position='relative'>
                            <Divider />
                            <AbsoluteCenter bg='white' px='4'>
                                {`Entry ${count}`}

                            </AbsoluteCenter>
                        </Box>
                        <br />
                        <Text>
                            {section}
                        </Text>

                    </>);
                })}

            </CardBody>
            <Divider />
            <CardFooter>
                <IconButton
                    aria-label='Add entry for story'
                    icon={<AddIcon />}
                    colorScheme="yellow"
                    variant='outline'
                    _hover={{ borderColor: "#d9c193" }}

                />
            </CardFooter>
        </Card>

    </div>);

}

export default StoryDisplay;