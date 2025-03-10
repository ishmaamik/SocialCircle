import { useEffect, useState } from "react";
import { Data } from "./Data";
import { getFriendsPosts } from "../../api/post";

const HomePage = () => {

    const [posts, setPosts]= useState([])
    const firstName= localStorage.getItem("firstName")

    useEffect(()=>{
        const fetchFriendPosts=async()=>{
            const postList= await getFriendsPosts(firstName)
            console.log(postList)
            setPosts(postList)
        }
        fetchFriendPosts()
    }, [])
    return (
        <>
        <div >
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

export default HomePage;
