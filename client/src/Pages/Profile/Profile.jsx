import Bar from "../../components/ProfileBar/Bar"
import ProfilePosts from "../../components/ProfilePosts/ProfilePosts"
import TopBar from "../../components/Topbar/TopBar"

const Profile=()=>{
    return(
        <div>
            <TopBar/>
            <div style={{display:"flex"}}>
            <Bar/>
            <ProfilePosts/>
            </div>
        </div>
    )
}

export default Profile