import { Flex, Heading, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";
function Navbar() {
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const linkStyle = {
        transition: "transform 0.3s ease-in-out",
        textDecoration: "none"
    };
    return (<Flex
        direction={'column'}
        style={{
            backgroundColor: '#B68D40',
            height: '100vh',
            width: "20vw",
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'fixed',
            left: 0,
            top: 0
        }}
    >
        <div style={{ textAlign: 'center', padding: '10px' }}>
            <Heading size='md'>Collab Tale</Heading>
        </div>

        <Link _hover={{ transform: "scale(1.1)" }} onClick={() => navigate("/GuestPage")}>Home</Link>
        <Link _hover={{ transform: "scale(1.1)" }} style={linkStyle} onClick={() => { navigate("/profile") }} >Profile</Link>
        <Link _hover={{ transform: "scale(1.1)" }} style={linkStyle} onClick={() => { navigate("/addStory") }}  >Add Story</Link>
        <Link _hover={{ transform: "scale(1.1)" }} style={linkStyle} onClick={signOut}   >Log out</Link>


    </Flex>
    );
}

export default Navbar;