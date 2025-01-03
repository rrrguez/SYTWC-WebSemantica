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
    <>
      <header>
        <h1>Games Wiki</h1>
        <h2 className="page-subtitle"> The Video Game Series Database </h2>
      </header>

      <div className="search-section">
        <form onSubmit={handleSearch} className="search-items">
          <input
            className="input-field"
            type="text"
            placeholder="Introduce the name of a video game series"
            value={sagaName}
            onChange={(e) => setSagaName(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {sagaDetails && (
        <div className="data-container">
          <div className="details-container" id="saga-container">
            { sagaDetails.logo ? (
              <div className="image-container">
                <img src={sagaDetails.logo} alt={`${sagaDetails.title} logo`} className="saga-logo" />
              </div>
            ) : (
              <h2>{sagaDetails.title}</h2>
            )}
            <div className="saga-details-container">
              <SagaDetails details={sagaDetails}/>
              <PartList parts={sagaDetails.parts} partIds={sagaDetails.partIds} onGameClick={handleGameClick}/>
            </div>
          </div>

          {gameDetails && (
            <div className="details-container">
              {gameDetails && <GameDetails details={gameDetails} />}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;

