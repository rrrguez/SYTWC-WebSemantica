import React, { useState } from "react";
import { fetchSPARQLData } from "./services/sparqlService";
import SagaDetails from "./components/SagaDetails";
import PartList from "./components/PartList";

function App() {
  const [sagaName, setSagaName] = useState("");
  const [sagaDetails, setSagaDetails] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await fetchSPARQLData(sagaName);
    setSagaDetails(data);
  };

  return (
    <div>
      <h1>Games Wiki</h1>
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
          <PartList parts={sagaDetails.parts} />
        </>
      )}
    </div>
  );
}

export default App;

