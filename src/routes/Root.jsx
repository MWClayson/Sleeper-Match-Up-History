import { useState, useEffect, useCallback } from 'react'
import { getLeague, getRosters } from '../API.js';
import {useNavigate } from "react-router-dom";

function Root(){
    const [currentLeagues,setCurrentLeagues] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [isLoading, setIsLoading] = useState(false);
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
        getLeague(inputValue).then((result) => {
            setCurrentLeagues([...currentLeagues,result]);
            setInputValue("");
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
        <p>
            <label>league Id:
                <input value = {inputValue} disabled = {isLoading} onChange={handleLeagueAddChange} name="leagueId"></input>
            </label>
            <button onClick={addLeague} disabled={isLoading}>{!isLoading ? 'add' : 'loading...'}</button>
        </p>
        
        <ul>
            {currentLeagues.map((i) => (
                <>
                    <li>{i.name} - {i.season}</li>
                </>
            ))}
        </ul>
        <button onClick={viewGrid} disabled={isLoading}>View Grid</button>
        </>
    )
}
export default Root
