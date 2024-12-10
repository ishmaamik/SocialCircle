import { Formik, Form } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Box } from "@mui/material"
import './forms.css'
import { setPageType } from "../../redux/authSlice"
import DropZone from "./Dropzone"
import Fields from "./Fields"
import RegisterButton from "./RegisterButton"
import LoginButton from "./LoginButton"
const initialRegister = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    profileImage: ""
}

const initialLogin = {
    username: "",
    password: ""
}

const registerSchema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    username: Yup.string().required(),
    password: Yup.string().required(),
    profileImage: Yup.string().required(),
    email: Yup.string().email().required(),

})

const loginSchema = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required(),
})

const Forms = ({ theme }) => {
    const pageType = useSelector((state) => state.auth.pageType)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLogin = pageType === "login"
    const isRegister = pageType === "register"

    const handleFormSubmit = async (values, onSubmitProps) => {

        const formData = new FormData();

        if (isRegister) {
            for (let value in values) {
                formData.append(value, values[value])
            }
            formData.append('profileImage', values.profileImage.name)

            const savedUserResponse = await fetch(
                "http://localhost:8000/auth/register",
                {
                    method: "POST",
                    body: formData
                }
            )

            const savedUser = await savedUserResponse.json()
            dispatch(setPageType("login"))
            onSubmitProps.resetForm()
        }

        else {

            for (let value in values) {
                formData.append(value, values[value])
            }

            const UserLogin = await fetch(
                "http://localhost:8000/auth/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                }
            )

            const savedUser = await UserLogin.json()

            console.log(savedUser)
            onSubmitProps.resetForm()
            navigate('/home')


        }
    }

    return (
        <>
            <Formik onSubmit={handleFormSubmit} initialValues={isLogin ? initialLogin : initialRegister} validationSchema={isLogin ? loginSchema : registerSchema}>
                {
                    ({ handleSubmit, values, setFieldValue }) =>

                    (
                        <Form onSubmit={handleSubmit}>
                            {
                                isRegister ? (
                                    <>
                                        <Box className="firstBox">
                                            <Fields label={"First Name"} name={"firstName"} gridColumn={"span 1"} type={"text"} />
                                            <Fields label={"Last Name"} name={"lastName"} gridColumn={"span 1"} type={"text"} />
                                            <Fields label={"Username"} name={"username"} gridColumn={"span 2"} type={"text"} />
                                            <Fields label={"Email"} name={"email"} gridColumn={"span 2"} type={"email"} />
                                            <Fields label={"Password"} name={"password"} gridColumn={"span 2"} type={"password"} />
                                            <DropZone theme={theme} values={values} setFieldValue={setFieldValue} profileImage={values.profileImage} />
                                        </Box>
                                    </>
                                )

                                    : (
                                        <>
                                            <Box className="fourthBox">
                                                <Fields label={"Username"} name={"username"} gridColumn={"span 2"} type={"text"} />
                                                <Fields label={"Password"} name={"password"} gridColumn={"span 2"} type={"password"} />
                                            </Box>
                                        </>
                                    )

                            }

                            {/* Buttons */}

                            {
                                isRegister ? (
                                    <>
                                        <RegisterButton />
                                    </>
                                )
                                    :
                                    (
                                        <>
                                            <LoginButton />
                                        </>
                                    )
                            }

                        </Form>
                    )
                }
            </Formik>

        </>
    )
}

export default Forms