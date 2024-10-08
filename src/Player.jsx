import { useEffect, useState } from "react";
import {SleeperImageCDN} from './Consts.js'
import { getUser } from "./API.js";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

function Player({player}){

    // useEffect(()=>{
    //     setLoading(true)
    //     getUser(playerId)
    //         .then(result =>{ 
    //             setUserInfo(result)
    //             setLoading(false)
    //         })
    // },[playerId])

    function getUserImageUrl(){
       return SleeperImageCDN.replace('<AvatarID>',player.avatar)
    }

    return(
        <>
            <Box
            sx={{
                width: 100,
                height: 100,
                borderRadius: 1,
                bgcolor: 'grey',
                justifyContent: "center",
                alignItems: "center",
                }} 
                >
                <Stack spacing={1}   direction="column"   
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Avatar alt={player.display_name} src={getUserImageUrl()}/>
                    {player.display_name}
                </Stack>
            </Box>
        </>
    )
}
export default Player
