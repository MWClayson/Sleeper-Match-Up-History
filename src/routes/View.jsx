import { useSearchParams, useNavigate, useParams  } from "react-router-dom";
import { useState, useEffect } from 'react'
import Grid from "../Grid";


function View(){
    const {leagueGroupId} = useParams();
    const [currentLeagues, setCurrentLeagues] = useState([]);
    

    const navigate = useNavigate();


      // Check if there are no search params and redirect
    useEffect(() => {
        if (leagueGroupId == null) {
            navigate("/"); // Navigate to the home route
        }
        
        const leagues = atob(leagueGroupId).split(",")
        setCurrentLeagues(leagues)

        

    }, [leagueGroupId, navigate]);
    
    
    return (
        <>
        league Group id: {leagueGroupId}
        <br></br>
        <p>{currentLeagues}</p>

        <Grid leagues={currentLeagues}></Grid>
        </>
    
    )
}

export default View