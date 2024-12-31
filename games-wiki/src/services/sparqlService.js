export async function fetchSPARQLData(query) {
    const sparqlQuery = `
      SELECT ?game ?gameLabel WHERE {
        ?game wdt:P31 wd:Q7889;  # Instancia de: videojuego
        FILTER(CONTAINS(LCASE(?gameLabel), LCASE("${query}"))).
        SERVICE wikibase:label { bd:serviceParam wikibase:language "es,en". }
      }
      LIMIT 10
    `;
  
    const endpoint = "https://query.wikidata.org/sparql";
    const url = `${endpoint}?query=${encodeURIComponent(sparqlQuery)}`;
  
    const response = await fetch(url, {
      headers: { Accept: "application/sparql-results+json" },
    });
    const data = await response.json();
  
    return data.results.bindings.map((binding) => ({
      name: binding.gameLabel.value,
      platform: binding.platformLabel?.value || "Not specified",
    }));
  }
  