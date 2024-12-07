import FlexBetween from "../../components/FlexBetween"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {DarkMode, LightMode, Notifications, Close, Search, Menu} from "@mui/icons-material"
import {Typography, IconButton, InputBase, Select, useMediaQuery, useTheme} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {setMode} from "../../redux/authSlice"

const Navbar=()=>{

    const user= useSelector((state)=> state.auth)
    const dispatch= useDispatch()
    const theme= useTheme();
    const navigate= useNavigate()
    const primaryLight= theme.palette.primary.light
    const alt= theme.palette.background.alt
    const dark= theme.palette.primary.dark
    const cyan= theme.palette.secondary.dark
    return(
        <div>
        <FlexBetween padding="1rem 6%" backgroundColor={alt} gap={"6rem"}>
                
            <Typography fontWeight="bold" fontSize="30px" color="primary" onClick={()=>navigate('/home')} sx={{ ":hover":{cursor:"pointer", color: dark}}}>
                SocialCircle
            </Typography>
                
            <FlexBetween>
                <InputBase placeholder="Search..." sx={{width:'300px'}}/>
                    <IconButton>
                        <Search/>
                    </IconButton>
            </FlexBetween>

            <IconButton onClick={()=>dispatch(setMode())}>
                {theme.palette.mode === "dark" ?
                (
                    <DarkMode/>
                )
                    :
                (
                    <LightMode/>
                )
                }
            </IconButton>

        </FlexBetween>

        </div>
    )
}

export default Navbar