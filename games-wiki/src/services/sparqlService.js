export async function fetchSPARQLData(query) {
    const sparqlQuery = `
      SELECT DISTINCT ?series ?seriesLabel ?originalTitle ?logo ?genreLabel ?publisherLabel ?platformLabel ?partLabel WHERE {
        ?series wdt:P31 wd:Q7058673;
                rdfs:label ?seriesLabel.

        FILTER(CONTAINS(LCASE(?seriesLabel), LCASE("animal crossing"))).

        OPTIONAL { ?series wdt:P1476 ?originalTitle. }
        OPTIONAL { ?series wdt:P154 ?logo. }
        OPTIONAL { ?series wdt:P136 ?genre. }
        OPTIONAL { ?series wdt:P123 ?publisher. }
        OPTIONAL { ?series wdt:P400 ?platform. }

        OPTIONAL {
          ?part wdt:P527 wd:Q7889; rdfs:label ?partLabel.
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
  