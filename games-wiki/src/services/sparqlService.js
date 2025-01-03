export async function fetchSeriesData(query) {
    document.body.style.cursor = "wait";

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
          ?part wdt:P179 ?series;
                rdfs:label ?partLabel.
          FILTER(LANG(?seriesLabel) = "en").
        }

        FILTER(LANG(?partLabel) = "en").

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
      genre: [
        ...new Set(data.results.bindings.map((binding) => binding.genreLabel?.value || "Not specified")),
      ],
      publisher: data.results.bindings[0]?.publisherLabel?.value || "Not specified",
      platforms: [
        ...new Set(data.results.bindings.map((binding) => binding.platformLabel?.value || "Not specified")),
      ],
      partIds: [
        ...new Set(data.results.bindings.map((binding) => binding.part?.value).filter(Boolean)),
      ],
      parts: [
        ...new Set(data.results.bindings.map((binding) => binding.partLabel?.value).filter(Boolean),
        ),
      ],
    };

    document.body.style.cursor = "default";

    if (details.title === "Not specified") {
      alert(`ERROR: Could not find a video game series named "${query}"`)
      return
    }

    return details;
  }
  
export async function fetchGameData(gameUri) {
  document.body.style.cursor = "wait";
  console.log(gameUri);
  const sparqlQuery = `
    SELECT DISTINCT ?game ?gameLabel ?logo ?originalTitle ?genreLabel ?publisherLabel ?countryLabel ?developerLabel ?platformLabel ?gameModeLabel ?announcementDate WHERE {
      
      BIND(wd:${gameUri} AS ?game)

      OPTIONAL { ?game wdt:P154 ?logo. }
      OPTIONAL { ?game wdt:P1476 ?originalTitle. }
      OPTIONAL { ?game wdt:P136 ?genre. }
      OPTIONAL { ?game wdt:P123 ?publisher. }
      OPTIONAL { ?game wdt:P495 ?country. }
      OPTIONAL { ?game wdt:P178 ?developer. }
      OPTIONAL {
        ?game wdt:P400 ?platform. 
        FILTER(LANG(?gameLabel) = "en").
      }
      OPTIONAL { ?game wdt:P404 ?gameMode. }
      OPTIONAL { ?game wdt:P6949 ?announcementDate. }

      ?game rdfs:label ?gameLabel.
      FILTER(LANG(?gameLabel) = "en").

      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }
  `;

  const sortedSparQLQuery = `
    SELECT DISTINCT ?releaseDate ?placeLabel ?flagImage ?sales WHERE {

      BIND(wd:${gameUri} AS ?game)

      ?game p:P577 ?releaseStatement.
      ?releaseStatement ps:P577 ?releaseDate.
      
      ?game p:P2664 ?salesStatement.
      ?salesStatement ps:P2664 ?sales.
      
      FILTER(!STRSTARTS(STR(?releaseDate), CONCAT(STR(YEAR(?releaseDate)), "-01-01"))).
      
      OPTIONAL {
        ?releaseStatement pq:P291 ?place.
        ?place wdt:P41 ?flagImage.
      }

      ?game rdfs:label ?gameLabel.
      FILTER(LANG(?gameLabel) = "en").

      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }

    ORDER BY ASC(?releaseDate) DESC(?sales)
    LIMIT 1
  `;

  const endpoint = "https://query.wikidata.org/sparql";
  const url = `${endpoint}?query=${encodeURIComponent(sparqlQuery)}`;
  const Url2 = `${endpoint}?query=${encodeURIComponent(sortedSparQLQuery)}`;

  const response = await fetch(url, {
    headers: { Accept: "application/sparql-results+json" },
  });

  const data = await response.json();

  const dateResponse = await fetch(Url2, {
    headers: { Accept: "application/sparql-results+json" },
  });

  const dateData = await dateResponse.json();

  const gameDetails = {
    logo: data.results.bindings[0]?.logo?.value,
    title: data.results.bindings[0]?.gameLabel?.value || "Not specified",
    originalTitle: data.results.bindings[0]?.originalTitle?.value || "Not specified",
    genre: [
      ...new Set(data.results.bindings.map((binding) => binding.genreLabel?.value || "Not specified")),
    ],
    publisher: data.results.bindings[0]?.publisherLabel?.value || "Not specified",
    country: data.results.bindings[0]?.countryLabel?.value || "Not specified",
    releaseDate: dateData.results.bindings[0]?.releaseDate?.value || null,
    placeLabel: dateData.results.bindings[0]?.placeLabel?.value || "Not specified",
    flagImage: dateData.results.bindings[0]?.flagImage?.value || null,
    sales: dateData.results.bindings[0]?.sales?.value || "Not specified",
    developer: [
      ...new Set(data.results.bindings.map((binding) => binding.developerLabel?.value || "Not specified")),
    ],
    platform: [
      ...new Set(data.results.bindings.map((binding) => binding.platformLabel?.value || "Not specified")),
    ],
    gameMode: [
      ...new Set(data.results.bindings.map((binding) => binding.gameModeLabel?.value || "Not specified")),
    ],
    announcementDate: data.results.bindings[0]?.announcementDate?.value || null,
  };

  document.body.style.cursor = "default";

  return gameDetails;
}