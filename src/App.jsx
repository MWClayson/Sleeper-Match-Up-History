import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Grid from './Grid.jsx'
function App() {
  const [leagues, setLeagues] = useState(["916267273759891456"]);
  const [isGridVisible, setIsGridVisible] = useState(false);

  function setGridVisibility(){
    console.log("Clicked");
    setIsGridVisible(isGridVisible => !isGridVisible);
  }

  return (
    <>
      <h1>Sleeper Match Up History</h1>
      <button onClick={setGridVisibility}>View Grid</button>
      <Grid isVisible={isGridVisible} leagues = {leagues}></Grid>
    </>
  )
}

export default App
