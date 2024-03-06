import { Flex, Heading, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
function Navbar() {
    const navigate = useNavigate();
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

        <Link onClick={() => { navigate("/GuestPage") }}>Home</Link>
        <Link onClick={() => { navigate("/profile") }} >Profile</Link>
        <Link >Genres</Link>
        <Link  >Add Story</Link>
        <Link style={{ marginBottom: '50px' }}  >Log out</Link>


    </Flex>
    );
}

export default Navbar;