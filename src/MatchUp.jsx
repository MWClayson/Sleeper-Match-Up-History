import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

function MatchUp({score, middle, colorFunction}){
    //const [color, setColor] = React.useState('#FFFFFF');
    const color = colorFunction(score.team1Count-score.team2Count)
    // const useStyles = makeStyles({
    //     bw: {
    //       filter: `brightness(0.5)`,
    //     },
    //   });
    
    if(middle){
        return(
            <Box        
            sx={{
            width: 100,
            height: 100,
            borderRadius: 1,
            bgcolor: color,
            justifyContent: "center",
            alignItems: "center",
            }} 
            
        >
        </Box>
        )
    }
    return (

        <Box        
            sx={{
            width: 100,
            height: 100,
            borderRadius: 1,
            bgcolor: colorFunction(score.team1Count-score.team2Count),
            '&:hover': {
                filter: `brightness(0.5)`
            },
            justifyContent: "center",
            alignItems: "center",
            }} 
            
        >
        <Typography noWrap overflow={false} maxWidth={100}>
            {score.team1Count} - {score.team2Count}        
        </Typography>
            
            
        </Box>

    )

}
export default MatchUp