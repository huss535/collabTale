import { useLocation } from "react-router-dom";
import { Heading, Card, CardBody } from "@chakra-ui/react";
import { story } from '../types';
function StoryDisplay() {
    const { state } = useLocation();
    const { storyOpened }: { storyOpened: story } = state;
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


            </CardBody>
        </Card>

    </div>);

}

export default StoryDisplay;