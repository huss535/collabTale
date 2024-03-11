import { getAuth, createUserWithEmailAndPassword, Auth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { FormControl, FormLabel, Input, Box, Button, useToast, Card, CardHeader, Heading, Divider, CardBody } from "@chakra-ui/react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
interface FormData {
    email: string;
    password: string;
}

interface FormErrors {
    emailFormat?: string;
    allFields?: string;
}

function LoginPage() {
    const navigate = useNavigate();
    const toast = useToast();
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });
    const validateEmail = (email: string) => {
        const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return re.test(String(email).toLowerCase());
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;


        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmission: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();

        let newErrors: FormErrors = {};
        if (!formData.email || !formData.password) {
            newErrors = { ...newErrors, allFields: "Please fill in all fields" };



        }
        else {
            newErrors = { ...newErrors, allFields: "" };

            if (!validateEmail(formData.email)) {

                console.log("email invalid");
                newErrors = { ...newErrors, emailFormat: "Invalid email format" };


            } else {

                newErrors = { ...newErrors, emailFormat: "" };

            }
        }



        if (!Object.values(newErrors).every(value => value === '')) {

            if (newErrors.allFields != '') {
                toast({

                    title: 'Error signing up',
                    description: newErrors.allFields,
                    status: 'error',
                    isClosable: true,
                    position: 'top'


                });

            } else {

                toast({

                    title: 'Error signing up',
                    description: newErrors.emailFormat,
                    status: 'error',
                    isClosable: true,
                    position: 'top'


                });

            }

        } else {
            try {

                await signInWithEmailAndPassword(auth, formData.email, formData.password).then((userCredential) => {
                    const uid: string = userCredential.user.uid;
                    navigate("/profile", { state: uid });

                }).catch((error) => {
                    console.log(error);

                    let errorMessage: string = "An error occurred. Please try again later.";
                    if (error.code === "auth/email-already-in-use") {
                        errorMessage = "This email is associated with an account.";
                    }
                    else if (error.code = "auth/invalid-credential") {
                        errorMessage = "Your account doesn't exist."
                    }
                    console.log(error);
                    toast({

                        title: 'Error signing up',
                        description: errorMessage,
                        status: 'error',
                        isClosable: true,
                        position: 'top'


                    });
                    //console.log(error);
                    // ..
                });
            }
            catch (error) { console.log(error); }



        }


    };




    return (
        <div style={{ height: '100vh', backgroundColor: '#FFFFE4', marginTop: '100px' }}>
            <Card style={{ margin: 'auto', alignContent: 'center', width: '60vw', borderRadius: '10px' }}>

                <CardHeader >
                    <Heading textAlign="center" as="h1" size='xl'>Log in</Heading>
                </CardHeader>
                <Divider />
                <CardBody>

                    <FormControl style={{ height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ width: '300px' }}>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" variant='filled' name="email" onChange={handleChange} />
                        </div>
                        <div style={{ width: '300px' }}>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" variant='filled' name="password" onChange={handleChange} />
                        </div>
                        <Divider />
                        <Button _hover={{ borderColor: "#d9c193" }} onClick={handleSubmission}  >Next</Button>
                    </FormControl>
                </CardBody>
            </Card>
        </div>


    );
}

export default LoginPage;