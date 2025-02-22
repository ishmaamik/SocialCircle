import {Data} from "./Data"

const TopBar=()=>{
    
    return(
        <>
            <div className="topBar">
                <ul className="unlisted">
                    {Data.map((p, key)=>{
                    return <li key={key} className="data" onClick={()=>{window.location.pathname=p.link}}>
                        <div href={p.link} style={{margin:"12px"}}>{p.icon}</div>
                        <div >{p.title}</div>
                    </li>})}
                </ul>
            </div>
        </>
    )
}

export default TopBar