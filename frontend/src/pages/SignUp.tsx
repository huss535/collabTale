import { FormControl, FormLabel, Input, Box, Button, useToast } from "@chakra-ui/react";
import { MouseEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth, createUserWithEmailAndPassword, Auth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

interface FormData {
    email: string;
    confirmedEmail: string;
    password: string;
    confirmedPassword: string;
}

interface FormErrors {
    emailMismatch?: string;
    emailFormat?: string;
    passwordMismatch?: string;
    allFields?: string;
}

function SignUp() {
    const navigate = useNavigate();
    const toast = useToast();
    const [formData, setFormData] = useState<FormData>({
        email: '',
        confirmedEmail: '',
        password: '',
        confirmedPassword: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;


        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    useEffect(() => {
        if (errors) {
            console.log(errors);
        }
    }, [errors]);

    const validateEmail = (email: string) => {
        const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return re.test(String(email).toLowerCase());
    };
    const handleSubmission: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        let newErrors: FormErrors = {};




        if (!formData.email || !formData.confirmedEmail || !formData.password || !formData.confirmedPassword) {
            newErrors = { ...newErrors, allFields: "Please fill in all fields" };
        }



        if (formData.email !== formData.confirmedEmail) {
            newErrors = { ...newErrors, emailMismatch: "Emails do not match" };
        }
        if (!validateEmail(formData.email) || !validateEmail(formData.confirmedEmail)) {
            newErrors = { ...newErrors, emailFormat: 'Invalid email format' }

        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                emailFormat: '',
            }));
        }

        if (formData.password !== formData.confirmedPassword) {
            newErrors = { ...newErrors, passwordMismatch: "Passwords do not match" };
        }

        if (Object.keys(newErrors).length === 0) {
            try {
                // const firebaseApp: FirebaseApp = await getFirebaseApp();
                // const auth = await getAuth(firebaseApp);
                //const firebaseApp: FirebaseApp = await getFirebaseApp();
                //const auth: Auth = getAuth(firebaseApp);

                await createUserWithEmailAndPassword(auth, formData.email, formData.password).then((userCredential) => {
                    toast({

                        title: 'Account created',
                        description: "Your account has been created.",
                        status: 'success',
                        isClosable: true,
                        position: 'top'


                    });
                    signInWithEmailAndPassword(auth, formData.email, formData.password).then((userCredential) => {
                        console.log("Signed in");
                        const uid: string = userCredential.user.uid;
                        navigate("/UserInfo", { state: uid });

                    }).catch((error) => { console.log(error); })


                })
                    .catch((error) => {
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
            setErrors(newErrors);



        }


    };







    return (
        <Box style={{ backgroundColor: '#FFFFE4', marginTop: 50 }}>
            <FormControl style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '30px' }}>
                <div>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <FormLabel>Confirm email</FormLabel>
                    <Input type="email" name="confirmedEmail"

                        value={formData.confirmedEmail} onChange={handleChange} />
                </div>

                <div>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>

                <div>
                    <FormLabel>Confirm password</FormLabel>
                    <Input type="password" name="confirmedPassword" value={formData.confirmedPassword} onChange={handleChange} />

                </div>
                <Button onClick={(e) => { handleSubmission(e) }}>Next</Button>
            </FormControl>
        </Box>
    );
}

export default SignUp;
