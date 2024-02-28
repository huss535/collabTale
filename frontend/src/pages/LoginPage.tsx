import { getAuth, createUserWithEmailAndPassword, Auth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { FormControl, FormLabel, Input, Box, Button, useToast } from "@chakra-ui/react";
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
    const [errors, setErrors] = useState<FormErrors>({});
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



        if (!formData.email || !formData.password) {
            setErrors((prevData) => ({
                ...prevData,
                allFields: "Please fill in all fields"
            }));

        }


        if (!validateEmail(formData.email)) {

            setErrors((prevData) => ({
                ...prevData,
                emailFormat: 'Invalid email format'
            }));

        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                emailFormat: '',
            }));
        }



        if (Object.keys(errors).length === 0) {
            try {
                // const firebaseApp: FirebaseApp = await getFirebaseApp();
                // const auth = await getAuth(firebaseApp);
                //const firebaseApp: FirebaseApp = await getFirebaseApp();
                //const auth: Auth = getAuth(firebaseApp);
                await signInWithEmailAndPassword(auth, formData.email, formData.password).then((userCredential) => {
                    console.log("Signed in");
                    const uid: string = userCredential.user.uid;
                    navigate("/profile", { state: uid });

                }).catch((error) => {
                    let errorMessage: string = "";
                    if (error.code === "auth/email-already-in-use") {
                        errorMessage = "This email is associated with an account.";
                    } else if (error.code === "auth/weak-password") {
                        errorMessage = "Please choose a stronger password with at least 6 characters.";
                    } else {
                        // Handle other error cases with a general error message
                        errorMessage = "An error occurred. Please try again later.";
                    }
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
        } else {

            if (errors.allFields != '') {
                toast({

                    title: 'Error signing up',
                    description: errors.allFields,
                    status: 'error',
                    isClosable: true,
                    position: 'top'


                });

            } else {

                toast({

                    title: 'Error signing up',
                    description: errors.emailFormat,
                    status: 'error',
                    isClosable: true,
                    position: 'top'


                });

            }

        }


    };




    return (<>
        <Box style={{ backgroundColor: '#FFFFE4', marginTop: 50 }}>
            <FormControl style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '30px' }}>
                <div style={{ width: '300px' }}>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" variant='filled' name="email" onChange={handleChange} />
                </div>
                <div style={{ width: '300px' }}>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" variant='filled' name="password" onChange={handleChange} />
                </div>

                <Button onClick={handleSubmission}  >Next</Button>
            </FormControl>
        </Box>

    </>);
}

export default LoginPage;