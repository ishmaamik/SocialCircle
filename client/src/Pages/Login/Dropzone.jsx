import './forms.css'
import Dropzone from 'react-dropzone'
import { Box, Typography} from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import { EditOutlined } from '@mui/icons-material'


const DropZone = ({theme, values, setFieldValue, profileImage}) => {

    
    return (
        <Box className="secondBox" sx={{ gridColumn: "span 2" }} border={`1px solid ${theme.palette.neutral.medium}`}>
            <Dropzone accept={{ "image/jpeg": [], "image/png": [], "image/jpg": [] }} multiple={false} onDrop={(acceptedFiles)=> setFieldValue("profileImage", acceptedFiles[0],)}>
                {
                    ({
                        getRootProps, getInputProps
                    }) => (
                        <Box {...getRootProps()} className="thirdBox" border={`2px dashed ${theme.palette.primary.main}`} sx={{ backgroundColor: "white" }}>
                            <input {...getInputProps()} />
                            {
                                !values.profileImage ?
                                    (<Typography sx={{ color: 'black', backgroundColor: 'white', '& .MuiInputLabel-root': { color: "black" }, '& .MuiInputBase-input': { color: "black" } }}> Add a picture </Typography>)
                                    :
                                    (<FlexBetween>
                                        <Typography sx={{ backgroundColor: 'white', '& .MuiInputBase-input': { color: "black" }, color: "black" }} >{values.profileImage.name}</Typography>
                                        <EditOutlined sx={{ width: '100px', alignItems: 'flex-start' }} />
                                    </FlexBetween>
                                    )
                            }
                        </Box>
                    )
                }
            </Dropzone>
        </Box>
    )
}

export default DropZone