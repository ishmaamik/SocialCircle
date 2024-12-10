import { Box, Typography, IconButton, Button } from "@mui/material"
import { useDispatch } from "react-redux"
import { setPageType } from "../../redux/authSlice"

const LoginButton = () => {
    const dispatch = useDispatch()
    return (
        <>
            <Box sx={{ mt: '20px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <Button type="submit">LogIn</Button>
            </Box>
            <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>

                <IconButton sx={{ mt: '5px', ":hover": { color: 'blue', backgroundColor: 'transparent' } }} onClick={() => dispatch(setPageType())} >
                    <Typography>New? SignUp to create an account here</Typography>
                </IconButton>
            </Box>
        </>
    )
}

export default LoginButton