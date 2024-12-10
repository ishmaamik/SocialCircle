import Form from "./Forms"
import "./login.css"
import { Box, Typography } from "@mui/material"

const Login=()=>{
    return(
        <div>
            <Box>
                <Box className="firstBoy">
                    <Typography fontWeight="bold" fontSize="32px" color="primary"> SocialCircle</Typography>
                </Box>

                <Box className="secondBoy"  height={'80vh'} overflow={"hidden"}>
                    <Typography fontWeight="500" variant="h5" sx={{ mb: "0.5rem", color:"#000000", justifyContent:"center" }}>Welcome to SocialCircle</Typography>
                        <Form/>
                </Box>
            </Box>
            
        </div>
    )
}

export default Login