import { Heading, Text, Link, Button, Stack } from "@chakra-ui/react";
import backgroundImage from "../assets/notepad-1130743_1280.jpeg";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    return (
        <div style={{ flexDirection: 'row', display: "flex", alignItems: 'center', position: "absolute", width: '100%', height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', textAlign: 'center', width: '100%', height: '100%' }}>
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
                        <Button>Login</Button>
                        <Button onClick={() => { navigate("/SignUp") }}>Sign up</Button>
                    </Stack>
                </div>
                <div>
                    <Link onClick={() => navigate("/GuestPage")}>
                        Continue as a guest
                    </Link>
                </div>
            </div>

            <div style={{ borderLeft: "10px solid #B68D40", borderWidth: '30px', backgroundImage: `url(${backgroundImage})`, width: '100%', height: '100%', backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", marginLeft: "0" }}>
            </div>
        </div>
    );
}

export default Home;
