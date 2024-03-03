import { Heading, Text, Link, Button, Stack } from "@chakra-ui/react";
import backgroundImage from "../assets/notepad-1130743_1280.jpeg";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    return (
        <div style={{ backgroundColor: 'inherit', display: 'flex', flexDirection: 'column', gap: '60px', alignContent: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div>
                <Heading padding="10px" as='h1' size="3xl">Collab Tale</Heading>
            </div>
            <div>
                <Text whiteSpace="pre-line">
                    Read {'\n'} write {'\n'} collaborate
                </Text>
            </div>
            <div>
                <Stack direction='column' spacing={20} align='center'>
                    <Button onClick={() => { navigate("/login") }}>Login</Button>
                    <Button onClick={() => { navigate("/SignUp") }}>Sign up</Button>
                </Stack>
            </div>
            <div>
                <Link onClick={() => navigate("/GuestPage")}>
                    Continue as a guest
                </Link>
            </div>
        </div>


    );
}

export default Home;
