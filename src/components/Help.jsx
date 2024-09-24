import React from "react";
import "./split.css"

function Help({handleHelp}){
    const closeHelp = () => {
        handleHelp()
    }
    return(
        <div className="helpMain">Helped screen <button onClick={() =>closeHelp()}>Close</button></div>
    )
}

export default Help;