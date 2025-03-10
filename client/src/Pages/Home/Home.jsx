import Friendbar from "../../components/FriendBar/Friendbar"
import HomePage from "../../components/HomePage/HomePage"
import Post from "../../components/PostStatus/Post"
import Sidebar from "../../components/Sidebar/Sidebar"
import SuggestionBar from "../../components/SuggestionBar/SuggestionBar"
import TopBar from "../../components/Topbar/TopBar"
import { useEffect } from "react"

const Home = () => {

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  useEffect(() => {
    const userProfileCookie = getCookie('githubProfile');  // Get the userProfile cookie
    console.log(userProfileCookie)
    if (userProfileCookie) {
      try {
        const decodedUserProfileCookie = decodeURIComponent(userProfileCookie);
        const userProfile = JSON.parse(decodedUserProfileCookie);  // Parse the decoded string // Parse the cookie value to an object
        console.log(userProfile)
        if (userProfile) {
          localStorage.setItem("firstName", userProfile.firstName);
          localStorage.setItem("username", userProfile.username);
          localStorage.setItem("profilePicture", userProfile.profilePicture);
        }
      } catch (error) {
        console.error('Error parsing user profile from cookie:', error);
      }
    }
  }, []); // This effect runs once on mount

  return (
    <>
      <div >
        <TopBar />
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>

            <Post />
            <HomePage />
          </div>
          
          <Sidebar />
          <div className="friendbar-suggestion-container">
        <Friendbar />
        <SuggestionBar />

        </div>
        
      </div>
      </div>
     
    </>
  )
}

export default Home