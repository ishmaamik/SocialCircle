import FlexCenter from "../../components/FlexBetween"
import Form from "./Forms"
import "./login.css"
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import { useDispatch } from "react-redux"
import {setMode} from "../../redux/authSlice"
import { DarkMode, LightMode } from "@mui/icons-material"

const Login=()=>{
    const theme= useTheme()
    const dispatch= useDispatch()
    return(
        <div>
            <Box>
                <Box className="firstBoy" bgcolor={theme.palette.background.alt}  justifyContent="center" alignItems={"center"}>
                    <FlexCenter>
                    <Typography fontWeight="bold" fontSize="32px" color="primary"> SocialCircle</Typography>
                    <IconButton onClick={()=>dispatch(setMode())}>
                        {theme === "dark" ? <DarkMode/> : <LightMode/>}
                    </IconButton>
                    </FlexCenter>
                </Box>

                <Box className="secondBoy"  height={'80vh'} overflow={"hidden"} bgcolor={theme.palette.background.alt}>
                    <Typography fontWeight="500" color={theme.palette.inverse.default} variant="h5" sx={{ mb: "0.5rem", justifyContent:"center" }}>Welcome to SocialCircle</Typography>
                        <Form theme={theme}/>
                </Box>
            </Box>
            
        </div>
    )
}

export default Login