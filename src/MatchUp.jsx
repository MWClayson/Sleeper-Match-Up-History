import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';


function MatchUp({score, middle}){
    const [color, setColor] = React.useState('#007fff');
    

    if(middle){
        return(
            <>
            </>
        )
    }
    return (
        <>
        <Box        
            sx={{
            width: 100,
            height: 100,
            borderRadius: 1,
            bgcolor: 'green',
            '&:hover': {
                bgcolor: 'primary.dark',
            },
            justifyContent: "center",
            alignItems: "center",
            }} 
            
        >
            <p>
            {score.team1Count} - {score.team2Count}
            </p>
        </Box>
        </>
    )

}
export default MatchUp