import FlexBetween from "../../components/FlexBetween"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {DarkMode, LightMode, Notifications, Close, Search, Menu, Message, Help, Info} from "@mui/icons-material"
import {Typography, IconButton, InputBase, Select, useMediaQuery, useTheme, FormControl, MenuItem} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {setLogout, setMode} from "../../redux/authSlice"

const Navbar=()=>{

    const user= useSelector((state)=> state.auth.user)
    const dispatch= useDispatch()
    const theme= useTheme();
    const navigate= useNavigate()
    const primaryLight= theme.palette.primary.light
    const neutralLight = theme.palette.neutral.light;
    const alt= theme.palette.background.alt
    const dark= theme.palette.primary.dark
    const cyan= theme.palette.secondary.dark
    const userName = user ? `${user.username}` : 'Guest';
    
    return(
        <div>
        <FlexBetween padding="1rem 6%" backgroundColor={alt} gap={"3rem"}> 
                
            <Typography fontWeight="bold" fontSize="32px" color="primary" onClick={()=>navigate('/home')} sx={{ ":hover":{cursor:"pointer", color: dark}}}>
                SocialCircle
            </Typography>
                
            <FlexBetween>
                <InputBase placeholder="Search..." sx={{width:'300px', backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[100], borderRadius: '10px', padding: '0.5rem', "& .MuiSvgIcon-root": {pr: "0.25rem", width: "3rem",}, "& .MuiSelect-select:focus": {backgroundColor: neutralLight,},}} input={<InputBase />}/>
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
                <Notifications/>
                <Message/>
                <Help/>
                <FormControl variant="standard" value={userName} sx={{justifyContent:'center'}}>
                    <Select value={userName}  sx={{ justifyContent:'center', backgroundColor: neutralLight, width: "150px", borderRadius: "0.25rem",p: "0.25rem 1rem"}}>
                        <MenuItem value={userName} sx={{justifyContent:'center'}}>
                            <Typography>{userName}</Typography>
                        </MenuItem>
                        <MenuItem sx={{justifyContent:'center'}} onClick={()=>dispatch(setLogout())}>LogOut</MenuItem>
                    </Select>
                </FormControl>
        </FlexBetween>

        </div>
    )
}

export default Navbar