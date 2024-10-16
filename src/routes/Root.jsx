import { useState, useEffect, useCallback } from 'react'
import { getLeague, getRosters } from '../API.js';
import {useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, Stack } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

function Root(){
    const [possibleLeagues,setPossibleLeagues] = useState([])
    const [currentLeagues,setCurrentLeagues] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [isByLeague, setIsByLeague] = useState("userId");
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

    const handleLeagueAddUserChange = useCallback(
        (e) => {
            setInputValue(e.target.value)
        },[setInputValue]
    )

    const handleLeagueFilterChange = (event) =>{
        setIsByLeague(event.target.value);
    };

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
            <FormControl>
                <RadioGroup
                    row
                    aria-labelledby="Find League By"
                    value = {isByLeague}
                    onChange = {handleLeagueFilterChange}
                    name="findbyLeagueGroup"
                >
                    <FormControlLabel value="userId" control={<Radio />} label="userId" />
                    <FormControlLabel value="leagueId" control={<Radio />} label="LeagueId" />
                </RadioGroup>
            </FormControl>
        </Box>

{/* 
        <Box>
            <FormControl>
                <Stack
                direction="column"
                spacing={2}
                sx={{
                    justifyContent: "flex-end",
                    alignItems: "center"
                }}>   
                <TextField id="userName" label="User Name" variant="standard" value = {inputValue} disabled = {isLoading} onChange={handleLeagueAddUserChange}/>
                <Button onClick={addLeague} disabled={isLoading} variant="text">{!isLoading ? 'Log In' : 'loading...'}</Button>
                <InputLabel id="demo-multiple-checkbox-label">asfd</InputLabel>
                <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={possibleLeagues}
                onChange={handleChange}
                input={<OutlinedInput label="Leagues" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                disabled = {isLoading || inputValue == ""}
                >
                {names.map((name) => (
                    <MenuItem key={name} value={name}>
                    <Checkbox checked={personName.includes(name)} />
                    <ListItemText primary={name} />
                    </MenuItem>
                ))}
                </Select>
                </Stack>
            </FormControl>
        </Box> */}


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
