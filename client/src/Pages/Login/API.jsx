
import { setLogin, setPageType } from "../../redux/authSlice"

export const HandleLogIn = async ({ values, formData, onSubmitProps, navigate, dispatch}) => {
    try {
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

        if(savedUser){
            dispatch(setLogin({
                user: savedUser.user,
                token: savedUser.token
            }))
        }
        console.log(savedUser.user)
        onSubmitProps.resetForm()
        navigate('/home')
    }
    catch (error) {
        console.log(error.message)
    }
}

export const HandleRegister = async ({ values, formData, onSubmitProps, dispatch }) => {
    try {
        if (!formData) {
            throw new Error("formData is not defined");
        }

        console.log(formData)

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
        dispatch(setPageType())
        onSubmitProps.resetForm()
    }
    catch (error) {
        console.log(error.message)
    }
}