import { io } from "socket.io-client";
import './App.css';
import { useEffect, useState } from "react";
import GaugeChart from 'react-gauge-chart'

function App() {
  const [battLevel, setBattLevel]=useState(0)
  const [charging, setCharging]=useState(false)

  useEffect(()=>{
    const socket = io('http://localhost:5000')

    socket.on('batt', (data)=>{
      let level = Number(data.battLevel)
      let charging = data.charging
      console.log(charging,data)
      setBattLevel(level)
      setCharging(charging)
      console.log(typeof(level), level)
      console.log('Cahrging: ', charging)
    })
  },[])

  return (
    <div className="App">
      <header className="App-header" draggable>
        <h3>Battery Level</h3>
        {charging===true?<p>Charging</p>:<p>Not Charging</p>}
        {/* <h6>{battLevel}%</h6> */}
        <GaugeChart id="gauge-chart" 
          nrOfLevels={20} 
          percent={battLevel/100}
          colors={["#ff0000","#00ff00"]}
        />
        <button onClick={onclick}>Get Ports</button>
      </header>
    </div>
  );
}

export default App;
