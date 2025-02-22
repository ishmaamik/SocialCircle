import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"


const Login = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const registerUser = async (firstName, lastName, email, password) => {

        try {
            const response = await fetch('http://localhost:3000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password
                })
            })

            const data = await response.json();

            if (response.ok) {
                console.log("User registered successfully", data);
                return true
            } else {
                console.error("Error registering user:", data);
                return false
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        console.log(firstName);
    }, [firstName])

    const handleSubmit = async () => {
        localStorage.setItem("firstName", firstName)
        localStorage.setItem("lastName", lastName)
        localStorage.setItem("email", email)
        const response = await registerUser(firstName, lastName, email, password)
        if (response) {
            navigate('/home');
        } else {
            alert("Error occurred during registration.");
        }
    }

    return (
        <>
            <div className="login" >
                <h1 style={{ marginLeft: "130px" }}>Register</h1>
                <TextField onChange={(e) => { setFirstName(e.target.value) }} style={{ marginTop: "10px", marginLeft: "27px", width: "350px" }} label="First Name" sx={{
                    '& fieldset': {
                        borderRadius: "30px"
                    }

                }} />
                <TextField onChange={(e) => setLastName(e.target.value)} style={{ marginTop: "20px", marginLeft: "27px", width: "350px" }} fullWidth label="Last Name" sx={{
                    '& fieldset': {
                        borderRadius: "30px"
                    }

                }} />
                <TextField onChange={(e) => setEmail(e.target.value)} style={{ marginTop: "20px", marginLeft: "27px", width: "350px" }} fullWidth label="Email" sx={{
                    '& fieldset': {
                        borderRadius: "30px"
                    }

                }} />

                <TextField onChange={(e) => setPassword(e.target.value)} style={{ marginTop: "20px", marginLeft: "27px", width: "350px" }} fullWidth label="Password" sx={{
                    '& fieldset': {
                        borderRadius: "30px"
                    }

                }} />

                <Button onClick={handleSubmit} variant="contained" style={{ marginTop: "20px", marginLeft: "150px", width: "100px", borderRadius: "30px", marginBottom: "25px" }}>Submit</Button>
            </div>

        </>
    )
}

export default Login;