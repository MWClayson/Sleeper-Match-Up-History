import { useState } from 'react'
import './App.css'
import Grid from './Grid.jsx'
function App() {
  const [leagues, setLeagues] = useState(["916267273759891456","793995802056982528","1052318984504311808"]);
  const [isGridVisible, setIsGridVisible] = useState(false);

  function setGridVisibility(){
    console.log("Clicked");
    setIsGridVisible(isGridVisible => !isGridVisible);
  }

  return (
    <>
      <h1>Sleeper Match Up History</h1>
      <button onClick={setGridVisibility}>View Grid</button>
      <div>
      {isGridVisible &&
        <Grid leagues = {leagues}></Grid>
      }
      </div>
    
      
    </>
  )
}

export default App
