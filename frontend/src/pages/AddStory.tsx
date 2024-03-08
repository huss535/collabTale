import Navbar from "../components/Navbar";
import { Button, Card, CardBody, CardHeader, Checkbox, CheckboxGroup, Divider, Flex, FormControl, FormLabel, HStack, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spacer, Stack, Textarea, VStack, useDisclosure } from "@chakra-ui/react";
import './CardsStyle.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface NewStoryEntry {
    title: string;
    synopsis: string;
    genres: string[];
    firstEntry: string;
}



interface MultiSelectModalProps {
    isOpen: boolean;
    onClose: () => void;
    options: string[];
    onConfirm: (selectedItems: string[]) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;

}

const MultiSelectModal: React.FC<MultiSelectModalProps> = ({ isOpen, onClose, options, onConfirm }) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleItemClick = (item: string) => {
        const selectedIndex = selectedItems.indexOf(item);
        let newSelectedItems = [...selectedItems];

        if (selectedIndex === -1) {
            newSelectedItems.push(item);
        } else {
            newSelectedItems.splice(selectedIndex, 1);
        }

        setSelectedItems(newSelectedItems);
    };

    const handleConfirm = () => {
        onConfirm(selectedItems);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Select Options</ModalHeader>
                <ModalBody>
                    <Stack spacing={4}>
                        {options.map((option, index) => (
                            <Checkbox key={index} isChecked={selectedItems.includes(option)} onChange={() => handleItemClick(option)}>
                                {option}
                            </Checkbox>
                        ))}
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button mr={3} onClick={handleConfirm}>
                        Confirm
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
function AddStory() {
    const navigate = useNavigate();
    const [isOpen1, setIsOpen1] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const uId = localStorage.getItem("userId");
    //console.log(uId);
    //const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [newEntry, setEntry] = useState<NewStoryEntry>({
        title: "",
        synopsis: "",
        genres: [],
        firstEntry: ""
    });

    const handleOpenModal = () => {
        setIsOpen1(true);
    };

    const handleCloseModal = () => {
        setIsOpen1(false);
    };

    const handleConfirm = (selectedItems: string[]) => {
        // Update the `genres` property of `newEntry` state
        setEntry((prevData) => ({
            ...prevData,
            genres: selectedItems,
        }));
    };
    const options = ['action', 'drama', 'thriller', 'horror', 'fantasy', 'science ficiton', 'mystery', 'adventure', 'young adult'];



    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Update the corresponding state variable
        // Update the newEntry state with the current values
        setEntry(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmission = async () => {
        if (newEntry.title === "" || newEntry.synopsis === "" || newEntry.genres.length === 0 || newEntry.firstEntry === "") {
            alert("Please full all sections");

        }

        else {

            const requestBody = {
                uId: uId,
                title: newEntry.title,
                synopsis: newEntry.synopsis,
                genres: newEntry.genres,
                firstEntry: newEntry.firstEntry

            };
            try {
                const response = await axios.post(import.meta.env.VITE_API + "/firestore/createNewStory", requestBody);

                console.log(response);
                navigate("/GuestPage");
            } catch (error) {

                console.log(error);
            }
        }

    }

    return (
        <Flex style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Navbar />
            <Flex className='inner-container'
            >
                <Card ml={{ base: '95px', lg: '250px' }}
                    pb='50px'
                    className='card-styling'
                >
                    <CardHeader className="card-header">

                        <Heading fontSize={['20px', '30px', '40px']}>
                            Add New Story
                        </Heading>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <CardBody>
                            <FormControl style={{ height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div >
                                    <FormLabel>Story title</FormLabel>
                                    <Input variant='filled' name="title" onChange={handleChange} />
                                </div>
                                <div >
                                    <FormLabel>Synopsis</FormLabel>

                                    <Textarea variant='filled' name="synopsis" onChange={handleChange} style={{ resize: 'none' }} />
                                </div>



                                <div>
                                    <Button onClick={handleOpenModal}>Choose genre(s)</Button>

                                    <MultiSelectModal isOpen={isOpen1} onClose={handleCloseModal} options={options} onConfirm={handleConfirm} />

                                </div>
                                <div>
                                    <Button onClick={onOpen}> Add first entry</Button>

                                    <Modal onClose={onClose} size="full" isOpen={isOpen}>
                                        <ModalContent>
                                            <ModalHeader alignSelf="center">Add a new Entry</ModalHeader>
                                            <ModalCloseButton />

                                            <ModalBody style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                                                <Textarea
                                                    placeholder="Add to the story"
                                                    resize="vertical"
                                                    name="firstEntry"
                                                    onChange={handleChange}
                                                    style={{ height: '350px' }}
                                                />
                                                <br />
                                                <br />
                                                <Button onClick={onClose}>
                                                    Confirm
                                                </Button>


                                            </ModalBody>
                                            <ModalFooter></ModalFooter>
                                        </ModalContent>
                                    </Modal>

                                </div>



                                <Divider />
                                <Button onClick={handleSubmission}  >Next</Button>
                            </FormControl>
                        </CardBody>
                    </CardBody>



                </Card>





            </Flex>

        </Flex>
    );
}

export default AddStory;