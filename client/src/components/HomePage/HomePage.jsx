import { Data } from "./Data";

const HomePage = () => {
    return (
        <>
        <div >
            {Data.map((p, key) => {
                return (
                    <div
                        key={key}
                        className={"not-first-post HomePage"} // Each post gets its own HomePage container
                        
                    >
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                            <img
                                className="smallpic"
                                src={p.profile}
                                alt="profile"
                            />
                            <div className="user-details">
                                <b>{p.username}</b>
                                <p className="user-about">
                                    {p.detail}
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
