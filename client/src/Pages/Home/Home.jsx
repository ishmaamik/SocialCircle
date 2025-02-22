import HomePage from "../../components/HomePage/HomePage"
import Post from "../../components/PostStatus/Post"
import Sidebar from "../../components/Sidebar/Sidebar"
import TopBar from "../../components/Topbar/TopBar"


const Home = () => {
  return (
    <div style={{ position: "relative" }}>
      <TopBar />
      <div style={{ display: "flex" }}>
      <div style={{ display: "flex", flexDirection:"column" }}>
        
          <Post />
          <HomePage />
        </div>

        <Sidebar />
      </div>
    </div>
  )
}

export default Home