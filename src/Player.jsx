import { useEffect, useState } from "react";
import {SleeperImageCDN} from './Consts.js'
import { getUser } from "./API.js";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
function Player({player}){

    function getUserImageUrl(){
       return SleeperImageCDN.replace('<AvatarID>',player.avatar)
    }

    return(
        <>
            <Box
            direction="column"
            sx={{
                width: 100,
                height: 100,
                borderRadius: 1,
                display:'flex',
                bgcolor: 'grey',
                justifyContent: "center",
                alignItems: "center",
                }} 
                >
                <Stack spacing={0}   direction="column"   
                sx={{
                    padding: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Avatar alt={player.display_name} src={getUserImageUrl()}/>
                    <Typography noWrap overflow={false} maxWidth={90}
                        sx ={{
                            '&:hover': {
                                overflow: "visible",
                            },
                        }}
                    >
                        {player.display_name}
                    </Typography>
                    
                </Stack>
            </Box>
        </>
    )
}
export default Player
