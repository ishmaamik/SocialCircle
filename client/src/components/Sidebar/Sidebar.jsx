

const Sidebar = () => {
    const firstName = localStorage.getItem("firstName")
    var lastName=""
    if (localStorage.getItem("lastName")) {
        lastName = localStorage.getItem("lastName")
    }
    const status = localStorage.getItem("status")
    let profilePicture = localStorage.getItem("profilePicture")
    return (
        <>
            <div className="sidebar">
                <div style={{ position: "relative" }}>
                    <img src="/flower.jpg" style={{ height: "100px", zIndex: "-1", width: "250px", position: "absolute", borderRadius: "12px", objectFit: "cover" }} />
                </div>
                <img src={profilePicture} className="profile" alt="" />
                <h3 className="nameText">{firstName} {lastName}</h3>
                <p className="profileText">{status}</p>
            </div>
        </>
    )
}

export default Sidebar;