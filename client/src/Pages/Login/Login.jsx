import FlexCenter from "../../components/FlexBetween"
import Form from "./Forms"
import "./login.css"
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import {setMode} from "../../redux/authSlice"
import { DarkMode, LightMode } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const Login=()=>{
    const theme= useTheme()
    const dispatch= useDispatch()
    const navigate= useNavigate()
    const pageType= useSelector((state)=> state.auth.pageType)
    let height=''
    if(pageType === "login"){
        height= '50vh'
    }
    else{
        height= '80vh'
    }
    return(
        <div>
            <Box>
                <Box className="firstBoy" bgcolor={theme.palette.background.alt}  justifyContent="center" alignItems={"center"}>
                    <FlexCenter>
                    <Typography fontWeight="bold" fontSize="32px" color="primary" sx={{cursor:'pointer'}} onClick={()=>navigate('/home')}> SocialCircle</Typography>
                    <IconButton onClick={()=>dispatch(setMode())}>
                        {theme === "dark" ? <DarkMode/> : <LightMode/>}
                    </IconButton>
                    </FlexCenter>
                </Box>

                <Box className="secondBoy"  height={height} overflow={"hidden"} bgcolor={theme.palette.background.alt}>
                    <Typography fontWeight="500" color={theme.palette.inverse.default} variant="h5" sx={{ mb: "0.5rem", justifyContent:"center" }}>Welcome to SocialCircle</Typography>
                        <Form theme={theme}/>
                </Box>
            </Box>
            
        </div>
    )
}

export default Login