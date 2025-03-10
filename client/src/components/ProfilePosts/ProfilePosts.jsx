import { useState, useEffect } from "react";
import { getUserPosts } from "../../api/post";


const ProfilePosts = () => {

    const [posts, setPosts]= useState([])
    const firstName= localStorage.getItem("firstName")
    const userImage= localStorage.getItem("profilePicture")
    useEffect(()=>{
        const fetchUserPosts=async()=>{
            const postList= await getUserPosts(firstName)
            setPosts(postList)
            console.log(postList)
        }
        fetchUserPosts()
    }, [])
    return (
        <>
        <div style={{marginTop:"130px", marginLeft:"90px"}}>
            {posts?.map((p, key) => {
                return (
                    <div
                        key={key}
                        className={"not-first-post HomePage"} // Each post gets its own HomePage container
                        
                    >
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                            <img
                                className="smallpic"
                                src={p.userImage}
                                alt="profile"
                            />
                            <div className="user-details">
                                <b>{p.firstName}</b>
                                <p className="user-about">
                                SWE Student @ IUT | Aspiring Software Developer
                                </p>
                            </div>
                        </div>
                        <p>{p.caption}</p>
                        <img
                            src={p.image}
                            alt="post"
                            className="user-post"
                        />
                    </div>
                );
            })}
        </div>
        </>
    );
};

export default ProfilePosts;
