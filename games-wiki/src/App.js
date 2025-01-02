import React, { useState } from "react";
import { fetchGameData, fetchSeriesData } from "./services/sparqlService";
import SagaDetails from "./components/SagaDetails";
import PartList from "./components/PartList";
import GameDetails from "./components/GameDetails";
import "./styles/App.css"

function App() {
  const [sagaName, setSagaName] = useState("");
  const [sagaDetails, setSagaDetails] = useState(null);
  const [gameDetails, setGameDetails] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await fetchSeriesData(sagaName);
    setSagaDetails(data);
    setGameDetails(null);
  };

  const handleGameClick = async (gameUri) => {
    const details = await fetchGameData(gameUri);
    setGameDetails(details);
  }

  return (
    <div>
      <header>
        <h1>Games Wiki</h1>
        <h2 className="page-subtitle"> The Video Game Series Database </h2>
      </header>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="E.g. Animal Crossing"
          value={sagaName}
          onChange={(e) => setSagaName(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {sagaDetails && (
        <>
          <SagaDetails details={sagaDetails} />
          <PartList parts={sagaDetails.parts} partIds={sagaDetails.partIds} onGameClick={handleGameClick}/>
        </>
      )}
      {gameDetails && <GameDetails details={gameDetails} />}
    </div>
  );
}

export default App;

