import React, { useState } from "react";
import { fetchSPARQLData } from "./services/sparqlService";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await fetchSPARQLData(query);
    setResults(data);
  };

  return (
    <div>
      <h1>Búsqueda de Juegos de Nintendo</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Introduce el nombre del juego"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      <div>
        {results.map((result, index) => (
          <div key={index}>
            <strong>{result.name}</strong>
            <p>{result.platform}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

