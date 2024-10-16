import LeagueBumpChart from "../Components/LeagueBumpChart"
import { getRosters, getUser } from "../API";
import { useEffect, useState } from "react"


function Graph(){
  const [teams,setTeams] = useState([])
 
    useEffect(() =>{ 
      const teamList = [];
      getRosters("916267273759891456").then((data) => {
          data.forEach(element => {
              getUser(element.owner_id).then((result) =>{
                teamList.push(result.display_name)
              })
          });
        })
        setTeams(teamList)
     },[])

return(
        <LeagueBumpChart teams={teams}></LeagueBumpChart>
    )
}
export default Graph