import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
function MatchUpPopOver({hoverPlayers,hoverStats,open,handlePopoverClose, anchorEl}){
    const [popoverPosition, setPopoverPosition] = useState({
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        transformOrigin: { vertical: 'top', horizontal: 'center' }
    });

    useEffect(() => {
        if (!anchorEl) return;

        const anchorRect = anchorEl.getBoundingClientRect();
        const popoverHeight = 300;
        const spaceBelow = window.innerHeight - anchorRect.bottom;
        const spaceAbove = anchorRect.top;

        if (spaceBelow < popoverHeight && spaceAbove > popoverHeight) {
            // Not enough space below, but enough space above
            setPopoverPosition({
                anchorOrigin: { vertical: 'top', horizontal: 'center' },
                transformOrigin: { vertical: 'bottom', horizontal: 'center' }
            });
        } else {
            setPopoverPosition({
                anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
                transformOrigin: { vertical: 'top', horizontal: 'center' }
            });
        }
    }, [anchorEl]);

    return(
        <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: 'none' }}
        open={open}
        anchorEl={anchorEl}
        container={anchorEl}
        anchorOrigin={popoverPosition.anchorOrigin}
        transformOrigin={popoverPosition.transformOrigin}
        onClose={handlePopoverClose}
        disableRestoreFocus>
            <Stack   
                direction="column"
                divider={<Divider orientation="horizontal" flexItem />}
                spacing={1}
                sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    borderRadius: 2,
                    p: 2,
                    minWidth: 300,
                }}    
            >
                <Typography variant="h4" component="h4">
                    {hoverPlayers && hoverPlayers.teamOne && hoverPlayers.teamOne.display_name ? hoverPlayers.teamOne.display_name : "Unknown Team"} 
                    {" Vs  "}
                    {hoverPlayers && hoverPlayers.teamTwo && hoverPlayers.teamTwo.display_name ? hoverPlayers.teamTwo.display_name : "Unknown Team"}
                </Typography>
                {hoverStats.map((stat => (
                    <div>
                        <p>{stat.leagueName ?? ""} {stat.season ?? ""} - Week {stat.week ?? ""} : {stat.teamOneScore ?? ""} - {stat.teamTwoScore ?? ""}</p>
                    </div>
                )))}
            </Stack>
        </Popover>
    )
}
export default MatchUpPopOver