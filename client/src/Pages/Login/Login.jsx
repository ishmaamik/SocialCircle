import Form from "./Forms"
import "./login.css"
import { Box, Typography } from "@mui/material"

const Login=()=>{
    return(
        <div>
            <Box>
                <Box className="firstBox">
                    <Typography fontWeight="bold" fontSize="32px" color="primary"> SocialCircle</Typography>
                </Box>

                <Box className="secondBox" width={'100vw'} height={'100vh'} overflow={"hidden"}>
                    <Typography fontWeight="500" variant="h5" sx={{ mb: "0.5rem", color:"#ffffff", justifyContent:"center" }}>Welcome to SocialCircle</Typography>
                        <Form/>
                </Box>
            </Box>
            
        </div>
    )
}

export default Login