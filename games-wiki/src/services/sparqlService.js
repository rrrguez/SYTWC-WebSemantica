export async function fetchSeriesData(query) {
    const sparqlQuery = `
      SELECT DISTINCT ?series ?seriesLabel ?originalTitle ?logo ?genreLabel ?publisherLabel ?platformLabel ?part ?partLabel WHERE {
        ?series wdt:P31 wd:Q7058673;
                rdfs:label ?seriesLabel.

        FILTER(CONTAINS(LCASE(?seriesLabel), LCASE("${query}"))).

        OPTIONAL { ?series wdt:P1476 ?originalTitle. }
        OPTIONAL { ?series wdt:P154 ?logo. }
        OPTIONAL { ?series wdt:P136 ?genre. }
        OPTIONAL { ?series wdt:P123 ?publisher. }
        OPTIONAL { ?series wdt:P400 ?platform. }

        OPTIONAL {
          ?series wdt:P527 ?part.
          FILTER(LANG(?seriesLabel) = "en").
        }

        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      }
    `;
  
    const endpoint = "https://query.wikidata.org/sparql";
    const url = `${endpoint}?query=${encodeURIComponent(sparqlQuery)}`;
  
    const response = await fetch(url, {
      headers: { Accept: "application/sparql-results+json" },
    });
    const data = await response.json();
  
    const details = {
      title: data.results.bindings[0]?.seriesLabel?.value || "Not specified",
      originalTitle: data.results.bindings[0]?.originalTitle?.value || "Not specified",
      logo: data.results.bindings[0]?.logo?.value || null,
      genre: data.results.bindings[0]?.genreLabel?.value || "Not specified",
      publisher: data.results.bindings[0]?.publisherLabel?.value || "Not specified",
      platforms: [
        ...new Set(data.results.bindings.map((binding) => binding.platformLabel?.value).filter(Boolean)),
      ],
      parts: [
        ...new Set(data.results.bindings.map((binding) => binding.partLabel?.value).filter(Boolean)),
      ],
    };

    return details;
  }
  
export async function fetchGameData(gameUri) {
  const sparqlQuery = `
    SELECT DISTINCT ?game ?gameLabel ?genreLabel ?publisherLabel ?countryLabel ?releaseDate ?sales ?developerLabel ?platformLabel ?gameModeLabel ?announcementLabel WHERE {
      BIND(<${gameUri}> AS ?game)

      OPTIONAL { ?game wdt:P136 ?genre. }
      OPTIONAL { ?game wdt:P123 ?publisher. }
      OPTIONAL { ?game wdt:P495 ?country. }
      OPTIONAL { ?game wdt:P577 ?releaseDate. }
      OPTIONAL { ?game wdt:P6486 ?sales. }
      OPTIONAL { ?game wdt:P178 ?developer. }
      OPTIONAL { ?game wdt:P400 ?platform. }
      OPTIONAL { ?game wdt:P404 ?gameMode. }
      OPTIONAL { ?game wdt:P6949 ?announcementDate. }

      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }
  `;

  const endpoint = "https://query.wikidata.org/sparql";
  const url = `${endpoint}?query=${encodeURIComponent(sparqlQuery)}`;

  const response = await fetch(url, {
    headers: { Accept: "application/sparql-results+json" },
  });

  const data = await response.json();

  const gameDetails = {
    title: data.results.bindings[0]?.gameLabel?.value || "Not specified",
    genre: data.results.bindings[0]?.genreLabel?.value || "Not specified",
    publisher: data.results.bindings[0]?.publisherLabel?.value || "Not specified",
    country: data.results.bindings[0]?.countryLabel?.value || "Not specified",
    releaseDate: data.results.bindings[0]?.releaseDate?.value || "Not specified",
    sales: data.results.bindings[0]?.sales?.value || "Not specified",
    developer: data.results.bindings[0]?.developerLabel?.value || "Not specified",
    platform: data.results.bindings.map((binding) => binding.platformLabel?.value).filter(Boolean),
    gameMode: data.results.bindings.map((binding) => binding.gameModeLabel?.value).filter(Boolean),
    announcementDate: data.results.bindings[0]?.announcementDate?.value || "Not specified",
  };

  return gameDetails;
}