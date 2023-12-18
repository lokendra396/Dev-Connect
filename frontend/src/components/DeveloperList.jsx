import React from "react";
import DeveloperList1 from "./DeveloperList1";
import DeveloperList2 from "./DeveloperList2";

function DeveloperList(){
    return(
        <>
        {
            !(localStorage.getItem("devconnect")) ? (<DeveloperList1/>) : (<DeveloperList2/>)
        }
        </>
    )
}

export default DeveloperList;