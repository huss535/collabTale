import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
    Wrap,
    WrapItem,
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
    Card,
    CardBody,
    Text,

    IconButton,
    AbsoluteCenter,

    CardHeader,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { story } from "../types";
import axios from "axios";

function StoryDisplay() {
    const textRef = useRef<HTMLTextAreaElement>(null);
    const { state } = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [storyOpened, setStoryOpened] = useState<story | null>(
        state?.storyOpened || null
    );

    const handleSubmission = async (event: React.FormEvent) => {
        event.preventDefault();

        if (
            textRef.current &&
            textRef.current.value.trim() !== "" &&
            storyOpened
        ) {
            try {

                const textEntry: string = textRef.current.value.trim();

                // Add new story entry
                //console.log("1.")
                //console.log(storyOpened);
                //console.log(storyOpened.id);
                //console.log(textEntry);
                await axios.post(
                    import.meta.env.VITE_API + "/firestore/postStoryEntry",
                    { id: storyOpened.id, newStoryEntry: textEntry }
                ).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                })

                // Retrieve updated story data
                const response = await axios.get(
                    import.meta.env.VITE_API + "/firestore/storyById",
                    { params: { id: storyOpened.id } }
                );

                // Update local state with new data
                console.log(response.data);
                setStoryOpened(response.data);
                onClose();
            } catch (error: any) {
                console.error("Error adding story entry:", error.message);
            }
        } else {
            alert("You didn't write anything!");
        }
    };
    //Generates different story entries
    const renderStoryEntries = () => {
        return (
            <Wrap justify='center' style={{ width: "70%" }}>
                {storyOpened?.storyText.map((section: string, index: number) => (

                    <WrapItem key={index}>
                        <Card
                            key={index}
                            style={{
                                border: "solid",
                                borderWidth: "3px",
                                borderRadius: "12px",
                                borderColor: "#B68D40",
                            }}
                        >
                            <CardHeader>
                                <AbsoluteCenter bg="white" px="4">
                                    {`Entry ${index + 1}`}
                                </AbsoluteCenter>
                            </CardHeader>
                            <CardBody>

                                <br />
                                <br />
                                <Text>{section}</Text>
                            </CardBody>

                        </Card>

                    </WrapItem>


                ))}

            </Wrap>

        );
    };


    return (
        <div
            style={{
                padding: 50,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                gap: "150px",
            }}
        >
            {storyOpened ? (
                <>
                    <Heading as="h1" size="2xl" textAlign="center">
                        {storyOpened.title}
                        <Heading as="h2" size="md">
                            Created by: {storyOpened.creator}
                        </Heading>
                    </Heading>

                    {renderStoryEntries()}

                    <IconButton
                        aria-label="Add entry for story"
                        icon={<AddIcon />}
                        onClick={onOpen}
                        colorScheme="yellow"
                        variant="outline"
                        _hover={{ borderColor: "#d9c193" }}
                    />
                    <Modal onClose={onClose} size="full" isOpen={isOpen}>
                        <ModalContent>
                            <ModalHeader alignSelf="center">Add a new Entry</ModalHeader>
                            <ModalCloseButton />

                            <ModalBody>
                                <form>
                                    <Textarea
                                        placeholder="Add to the story"
                                        size="lg"
                                        resize="none"
                                        ref={textRef}
                                    />
                                    <Button type="submit" onClick={handleSubmission}>
                                        Close
                                    </Button>
                                </form>
                            </ModalBody>
                            <ModalFooter></ModalFooter>
                        </ModalContent>
                    </Modal>
                </>
            ) : (
                <div>Something is wrong</div>
            )}
        </div>
    );
}

export default StoryDisplay;
