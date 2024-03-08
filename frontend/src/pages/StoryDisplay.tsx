import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import './CardsStyle.css'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Text,
    Textarea,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    useDisclosure,
    Heading,
    IconButton,
    Flex,
    Card,
} from "@chakra-ui/react";
import axios from "axios";
import { story } from "../types";
import Navbar from "../components/Navbar";
import { useAuth } from '../context/AuthContextProvider';


function StoryDisplay() {
    const textRef = useRef<HTMLTextAreaElement>(null);
    const { user } = useAuth();
    const { state } = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [storyOpened, setStoryOpened] = useState<story | null>(
        state?.storyOpened || null
    );

    const handleSubmission = async (event: React.FormEvent) => {
        event.preventDefault();
        if (user) {
            if (textRef.current && textRef.current.value.trim() !== "" && storyOpened) {
                try {
                    const textEntry: string = textRef.current.value.trim();

                    await axios
                        .post(import.meta.env.VITE_API + "/firestore/postStoryEntry", {
                            id: storyOpened.id,
                            newStoryEntry: textEntry,
                        })
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    const response = await axios.get(
                        import.meta.env.VITE_API + "/firestore/storyById",
                        { params: { id: storyOpened.id } }
                    );

                    setStoryOpened(response.data);
                    onClose();
                } catch (error: any) {
                    console.error("Error adding story entry:", error.message);
                }
            } else {
                alert("You didn't write anything!");
            }
        } else {
            alert("You have to be logged in to add entries")
        }
    };

    return (
        <Flex
        >
            <Navbar />
            {storyOpened ? (
                <Flex
                    pb='50px'
                    ml={{ base: '100px', lg: '200px' }}
                    className="inner-container">
                    <Card className="card-styling">
                        <Heading
                            padding="30px"
                            as="h1"
                            size="2xl"
                            textAlign="center"
                            fontSize={['25px', '35px', '45px']}
                        >
                            {storyOpened.title}
                            <Heading
                                as="h2"
                                size="md"
                                fontSize={['13px', '15px', '20px']}

                            >
                                Created by: {storyOpened.creator}
                            </Heading>

                        </Heading>
                    </Card>
                    <Card className="card-styling">
                        <Accordion style={{ maxHeight: '400px', overflowY: 'auto' }} allowToggle >
                            {storyOpened.storyText.map((section: string, index: number) => (
                                <AccordionItem key={index} >
                                    <AccordionButton _hover={{ borderColor: "#d9c193" }} >
                                        <Heading as="h3" size="md" flex="1" textAlign="center">
                                            Entry {index + 1}
                                        </Heading>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    <AccordionPanel pb={4}>
                                        <Text style={{ maxHeight: '300px', overflow: 'auto' }}>{section}</Text>
                                    </AccordionPanel>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </Card>

                    <Button
                        onClick={onOpen}

                        _hover={{ borderColor: "#d9c193" }}
                    > Add entry</Button>
                    <Modal onClose={onClose} size="full" isOpen={isOpen}>
                        <ModalContent>
                            <ModalHeader alignSelf="center">Add a new Entry</ModalHeader>
                            <ModalCloseButton />

                            <ModalBody style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Textarea
                                    placeholder="Add to the story"
                                    size="lg"
                                    resize="vertical"
                                    ref={textRef}
                                />
                                <br />
                                <br />
                                <Button _hover={{ borderColor: "#d9c193" }} type="submit" onClick={handleSubmission}>
                                    Confirm
                                </Button>
                            </ModalBody>
                            <ModalFooter></ModalFooter>
                        </ModalContent>
                    </Modal>



                </Flex>
            ) : (
                <div>Something is wrong</div>
            )}
        </Flex>
    );
}

export default StoryDisplay;
