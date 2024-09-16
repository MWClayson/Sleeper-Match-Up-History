import { useEffect, useState } from "react";
import {SleeperImageCDN} from './Consts.js'
import { getUser } from "./API.js";

function Player({playerId}){
    const [loading, setLoading] = useState(true);
    const [playerImage, setPlayerImage] = useState("")
    const [userInfo, setUserInfo] = useState({})



    useEffect(()=>{
        setLoading(true)
        getUser(playerId)
            .then(result =>{ 
                setUserInfo(result)
                setLoading(false)
            })
    },[playerId])

    function getUserImageUrl(){
       return SleeperImageCDN.replace('<AvatarID>',userInfo.avatar)
    }

    if(loading){
        return(
            <p>Loading...</p>
        )
    }

    return(
        <>
            <div>
                <img src={getUserImageUrl()}></img>
                <p>{userInfo.display_name}</p>
            </div>
        </>
    )
}
export default Player