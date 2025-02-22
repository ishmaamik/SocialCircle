

const Sidebar = () => {
    const firstName= localStorage.getItem("firstName")
    const lastName= localStorage.getItem("lastName")
    const status= localStorage.getItem("status")
    return (
        <>
            <div className="sidebar">
                <img src="/public/User.jpg" className="profile" alt="" />
                <h3 className="nameText">{firstName} {lastName}</h3>
                <p className="profileText">{status}</p>
            </div>
        </>
    )
}

export default Sidebar;