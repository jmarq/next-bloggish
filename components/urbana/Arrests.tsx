import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import _ from "lodash";
import { table, from, op } from "arquero";
import NivoBar from "components/NivoBar";

const myClient = new QueryClient();
const getData = async () => {
  const response = await fetch(
    "https://data.urbanaillinois.us/resource/afbd-8beq.json"
  );
  const json = await response.json();
  return json;
};

// this got kind of nasty. need more practice with cleanly doing nested rollups in Arquero
const prepareData = (data) => {
  let results = [];
  let crimes = [];
  if (data) {
    let table = from(data);
    // sigh
    table = table.rename({ arrestee_sex: "race", arrestee_race: "sex" });
    crimes = data.map((d) => d.crime_category_description);
    crimes = Array.from(new Set(crimes));
    console.log(crimes);

    results = table
      .groupby({
        race: (d: any) => d.race,
      })
      // .pivot("crime_category_description", { hmm: () => 1 })
      // .pivot({ key: (d) => "hey" }, { value: (d) => op.sum(d) })
      // // .count()
      .objects({ grouped: "entries" });

    let finalResults = [];
    for (let entry of results) {
      const [race, list] = entry;
      let entryTable = from(list);
      let grouped = entryTable
        .groupby("crime_category_description")
        .count()
        .pivot("crime_category_description", "count")
        .objects({ grouped: "object" });
      let entryResults = {
        race,
        ...grouped[0],
      };
      finalResults.push(entryResults);
    }
    results = finalResults;
  }
  results = Array.from(results);
  // return results;
  return {
    preparedData: results,
    keys: crimes,
  };
};

const DataViewer = () => {
  const { data, isLoading, error } = useQuery("arrests", getData);
  console.log(prepareData(data));
  const { preparedData, keys } = prepareData(data);
  return (
    <div>
      {data && (
        <div style={{ height: 500 }}>
          <NivoBar
            data={preparedData}
            keys={keys}
            indexBy={"race"}
            yLabel="count"
          />
        </div>
      )}
      {/* {JSON.stringify(data)} */}
    </div>
  );
};

const ArrestQuery = () => {
  return (
    <QueryClientProvider client={myClient}>
      <DataViewer></DataViewer>
    </QueryClientProvider>
  );
};

export default ArrestQuery;
