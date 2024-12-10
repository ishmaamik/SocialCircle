import {Formik, Field, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import { Box, TextField, Typography, colors } from "@mui/material"
import Dropzone from "react-dropzone"
import FlexBetween from "../../components/FlexBetween"
import { EditOutlined } from "@mui/icons-material"
import './forms.css'
import { useTheme } from "@mui/material"
const initialRegister={
    firstName: "",
    lastName:"",
    username:"",
    email: "",
    password: "",
    picturePath: ""
}

const initialLogin={
    username: "",
    password: ""
}

const onSubmit=(values)=>{
        console.log('Form data ', values)
}

const registerSchema= Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    username: Yup.string().required(),
    password: Yup.string().required(),
    picturePath: Yup.string().required(),
    email: Yup.string().email().required(),
    
})

const loginSchema= Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required(),
})

const Forms=({theme})=>{
    const pageType= useSelector((state)=>state.auth.pageType)
    const dispatch= useDispatch()
    const navigate= useNavigate()
    const isLogin= pageType==="login"
    const isRegister= pageType==="register"

    const handleFormSubmit= async(values, onSubmitProps)=> {}

    return(
       <>
       <Formik onSubmit={handleFormSubmit} initialValues={isLogin ? initialLogin : initialRegister} validationSchema={isLogin ? loginSchema : registerSchema}>
            {
                ({
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    handleReset,
                    resetForm,
                    touched,
                    setFieldValue

                }) =>
                (
                    <Form onSubmit={handleSubmit}>
                        <Box className="firstBox">
                            {
                                isRegister && (
                                    <>
                                    <Field render={({field})=>(<TextField {...field} sx={{ gridColumn: "span 1", backgroundColor:"white", '& .MuiInputLabel-root': {color: "black"} }} label="First Name" />)} type="text" name="firstName" id="firstName"/>
                                    <ErrorMessage name="firstName" className="bgColor"/>

                                    <Field render={({field})=>(<TextField {...field} sx={{ gridColumn: "span 1", backgroundColor:"white", '& .MuiInputLabel-root': {color: "black"}}} label="Last Name"/>)} type="text" name="lastName" id="lastName"/>
                                    <ErrorMessage name="lastName" className="bgColor"/>

                                    <Field render={({field})=>(<TextField {...field} sx={{ gridColumn: "span 2", backgroundColor:"white", '& .MuiInputLabel-root': {color: "black"}}} label="Username"/>)} type="text" name="username" id="username"/>
                                    <ErrorMessage name="username" className="bgColor"/>

                                    <Field render={({field})=>(<TextField {...field} sx={{ gridColumn: "span 2" , backgroundColor:"white", '& .MuiInputLabel-root': {color: "black"} }}label="Email"/>)} type="email" name="email" id="email"/>
                                    <ErrorMessage name="email" className="bgColor"/>

                                    <Field render={({field})=>(<TextField {...field} sx={{ gridColumn: "span 2", backgroundColor:"white",  '& .MuiInputLabel-root': {color: "black"}}} label="Password" type="password"/>)} type="password" name="password" id="password"/>
                                    <ErrorMessage name="password" className="bgColor"/>

                                    <Box className="secondBox" sx={{gridColumn: "span 2"}} border={`1px solid ${theme.palette.neutral.medium}`}>
                                        <Dropzone accept={{"image/jpeg": [],"image/png": [], "image/jpg": []}} multiple={false} onDrop={(acceptedFiles)=> setFieldValue("picturePath", acceptedFiles[0])}>
                                                {
                                                    ({
                                                        getRootProps, getInputProps
                                                    }) => (
                                                        <Box {...getRootProps()} className="thirdBox" border={`2px dashed ${theme.palette.primary.main}`} sx={{backgroundColor:"white"}}>
                                                            <input {...getInputProps()}/>
                                                            {
                                                                !values.picturePath ? (<Typography sx={{color:'black',backgroundColor:'white', '& .MuiInputLabel-root': {color: "black"}}}> Add a picture </Typography>) : (
                                                                    <FlexBetween>
                                                                        <Typography sx={{backgroundColor:'white'}} >{values.picturePath.name}</Typography>
                                                                            <EditOutlined sx={{ width:'100px', alignItems:'flex-start'}}/>
                                                                    </FlexBetween>
                                                                ) 
                                                            }
                                                        </Box>
                                                    )
                                                }
                                                
                                                
                                        </Dropzone>
                                    </Box>
                                    </>
                                )
                            }

                            {
                                isLogin && (
                                    <>
                                    <Field render={({field})=>(<TextField {...field} sx={{ gridColumn: "span 4", backgroundColor:"white" }}/>)} type="text" name="username" id="username"/>
                                    <ErrorMessage name="username"/>

                                    <Field render={({field})=>(<TextField {...field} sx={{ gridColumn: "span 4", backgroundColor:"white" }}/>)} type="password" name="password" id="password"/>
                                    <ErrorMessage name="password"/>
                                    </>
                                )
                            }
                        </Box>
                    </Form>
                )
            }
       </Formik>

       </>
    )
}

export default Forms