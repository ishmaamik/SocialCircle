import { Data } from "./Data"
import { Button, TextField } from "@mui/material"

const Post = () => {
    return (
        <>
            <div className="first-post HomePost" >
                <div style={{ display: "flex" }}>
                    <img src="/User.jpg" className="smallpic" alt="" />
                    <TextField label="Post Something?" fullWidth style={{ paddingLeft: '15px' }} sx={{
                        '& label': { paddingLeft: "15px", fontSize: "17px", fontWeight: "50px" },
                        '& fieldset': {
                            borderRadius: '100px',
                        }
                    }} />
                </div>

                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginTop: "20px" }}>
                    {Data.map((p, key) => {
                        return <div key={key} style={{ display: "flex", alignItems: "center" }}>
                            <div>{p.icon}</div>
                            <Button style={{ color: "black" }}>{p.title}</Button>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default Post;