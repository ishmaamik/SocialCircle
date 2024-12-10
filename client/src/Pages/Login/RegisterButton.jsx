import { Box, Typography, IconButton, Button } from "@mui/material"
import { useDispatch } from "react-redux"
import { setPageType } from "../../redux/authSlice"

const RegisterButton = () => {
    const dispatch= useDispatch()
    return (
        <>
            <Box sx={{ mt: '20px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <Button type="submit">Register</Button>
            </Box>
            <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <IconButton sx={{ mt: '10px', ":hover": { color: 'blue', backgroundColor: 'transparent' } }} onClick={() => dispatch(setPageType())} >
                    <Typography>Already Have an account? LogIn here</Typography>
                </IconButton>
            </Box>
        </>
    )
}

export default RegisterButton