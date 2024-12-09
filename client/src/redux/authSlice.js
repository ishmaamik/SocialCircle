import { createSlice } from "@reduxjs/toolkit";

const initialState={
    posts: [],
    user: null,
    token: null,
    mode: "light",
    pageType: "register"
}
const authSlice= createSlice({
    initialState: initialState,
    name: "auth",
    reducers:{
        setLogin: (state, action)=>{
            state.user= action.payload.user
            state.token= action.payload.token
        },
        setLogout:(state)=>{
            state.user= null
            state.token= null
        },
        setFriends:(state, action)=>{
            if(state.user){
            state.user.friends= action.payload.friends
            }
        },
        setPosts: (state, action)=>{
            state.posts= action.payload.posts 
        },
        setMode: (state)=>{
           state.mode= state.mode === "light" ? "dark" : "light"
        },

        setUpdatedPost: (state, action)=>{
            const updatedPosts= state.posts.map((post)=>{
                if(post._id===action.payload._id)
                    return action.payload.post
                else
                    return post
            })

            state.posts= updatedPosts
        },

        setPageType: (state)=>{
            state.pageType= state.pageType ==="login"? "register" : "login"
        }
    }
})

export const {setFriends, setPageType,setLogin, setLogout, setMode, setPosts, setUpdatedPost}= authSlice.actions
export default authSlice.reducer