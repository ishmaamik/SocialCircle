import { TextField } from "@mui/material"
import { Field, ErrorMessage } from "formik"

const Fields=({name, gridColumn, label, type})=>{
    return(
        <>
        <Field render={({field})=>(<TextField {...field} sx={{ color:'black',gridColumn: gridColumn,backgroundColor:"white", '& .MuiInputLabel-root': {color: "black"}, '& .MuiInputBase-input': {color: "black"} }} label={label} type={type} />)} name={name} id={name}/>
        <ErrorMessage name={name}/>
        </>
    )
}

export default Fields