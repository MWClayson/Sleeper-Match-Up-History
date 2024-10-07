import { useState, useEffect, useCallback } from 'react'
import { getLeague, getRosters } from '../API.js';
import {useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';

function Root(){
    const [currentLeagues,setCurrentLeagues] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [isByLeague, setIsByLeague] = useState(false);
    const navigate = useNavigate();

    // const getLeague(leagueId){
    //     getLeague(leagueId)
    //     .then(())
    // }

    const handleLeagueAddChange = useCallback(
        (e) => {
            setInputValue(e.target.value)
        },[setInputValue]
    )

    function addLeague()
    {       
        setIsLoading(true);
        // if(!isNumber(inputValue))
        // {
        //     setInputValue("");
        //     setIsLoading(false);
        //     return;
        // }

        getLeague(inputValue).then((result) => {
            setCurrentLeagues([...currentLeagues,result]);
            setInputValue("");
            // setIsLoading(false);
        }).finally(()=>{
            setIsLoading(false);
        });
        
    }

    function viewGrid()
    {
        navigate("/view/"+btoa(currentLeagues.map((cl) => cl.league_id).join(',')));
    }

    function isNumber(value) {
        let integerValue = parseInt(value);

        if(!isNaN(value) && value === '' + integerValue)
            return true
        else
            return false;
    }

    return (
        <>
        <h1>Sleeper Match Up History</h1>

        <Box>  
            <Stack   
                direction="column"
                spacing={2}
                sx={{
                    justifyContent: "flex-end",
                    alignItems: "center",
            }}>    
                <TextField id="leagueId" label="League Id" variant="standard" value = {inputValue} disabled = {isLoading} onChange={handleLeagueAddChange}/>
                <Button onClick={addLeague} disabled={isLoading} variant="text">{!isLoading ? 'add' : 'loading...'}</Button>
            </Stack>
        </Box>
        
        <ul>
            {currentLeagues.map((i) => (
                <>
                    <li>{i.name} - {i.season}</li>
                </>
            ))}
        </ul>
        <Button onClick={viewGrid} disabled={isLoading || currentLeagues.length == 0} variant="contained">Save</Button>
        </>
    )
}
export default Root
