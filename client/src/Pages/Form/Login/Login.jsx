import { TextField, Button } from "@mui/material";

const Login = () => {

    return (
        <>
            <div className="login" >
                <h1 style={{marginLeft: "130px"}}>Register</h1>
                <TextField style={{ marginTop: "10px", marginLeft:"27px", width:"350px" }} label="First Name" sx={{
                    '& fieldset': {
                        borderRadius: "30px"
                    }

                }} />
                <TextField style={{ marginTop: "20px", marginLeft: "27px", width:"350px" }} fullWidth label="Last Name" sx={{
                    '& fieldset': {
                        borderRadius: "30px"
                    }

                }} />
                <TextField style={{ marginTop: "20px", marginLeft: "27px" , width:"350px"}} fullWidth label="Email" sx={{
                    '& fieldset': {
                        borderRadius: "30px"
                    }

                }} />

                <TextField style={{ marginTop: "20px", marginLeft: "27px", width:"350px" }} fullWidth label="Password" sx={{
                    '& fieldset': {
                        borderRadius: "30px"
                    }

                }} />

                <Button variant="contained" style={{ marginTop: "20px", marginLeft: "150px" , width:"100px", borderRadius:"30px", marginBottom:"25px"}}>Submit</Button>
            </div>

        </>
    )
}

export default Login;