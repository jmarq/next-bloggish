import React, { useMemo, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import _, { set } from "lodash";
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

const prepareData = (data, breakdownColumn = "crime_category_description") => {
  console.log("preparing data");
  if (data) {
    console.log("have data to prepare");
    console.log({ breakdownColumn });
    let keys = data.map((d) => d[breakdownColumn]);
    keys = Array.from(new Set(keys));
    let table = from(data);
    // sigh
    table = table.rename({ arrestee_sex: "race", arrestee_race: "sex" });
    const groupedObjects = table
      .groupby("race", breakdownColumn)
      .count()
      .impute({ count: () => 0 }, { expand: ["race", breakdownColumn] })
      .objects({ grouped: true });
    const groupedTable = from(groupedObjects);
    const results = groupedTable
      .groupby("race")
      .pivot(breakdownColumn, "count")
      .objects({ grouped: true });
    console.log(results);
    // return results;
    return {
      preparedData: results,
      keys,
    };
  } else {
    return {
      preparedData: [],
      keys: [],
    };
  }
};

// this got kind of nasty. need more practice with cleanly doing nested rollups in Arquero
// const prepareData = (data) => {
//   let results = [];
//   let crimes = [];
//   if (data) {
//     let table = from(data);
//     // sigh
//     table = table.rename({ arrestee_sex: "race", arrestee_race: "sex" });
//     crimes = data.map((d) => d.crime_category_description);
//     crimes = Array.from(new Set(crimes));
//     console.log(crimes);

//     const groupedByRace = table.groupby({
//       race: (d: any) => d.race,
//     });

//     // grouped.print();
//     results = groupedByRace.objects({ grouped: "entries" });
//     // console.log(results);
//     let finalResults = [];
//     for (let entry of results) {
//       const [race, list] = entry;
//       // nested table to group/count/pivot. is there a better way to do this?
//       let entryTable = from(list);
//       let groupedByCategory = entryTable.groupby("crime_category_description");

//       // console.log(groupedByCategory.objects({grouped: "entries"}))
//       let pivoted = groupedByCategory
//         .count()
//         .pivot("crime_category_description", "count")
//         .objects({ grouped: "object" });
//       // summary object
//       let entryResults = {
//         race,
//         ...pivoted[0],
//       };
//       finalResults.push(entryResults);
//     }
//     results = finalResults;
//   }
//   results = Array.from(results);
//   return {
//     preparedData: results,
//     keys: crimes,
//   };
// };

const DataViewer = () => {
  const { data, isLoading, error } = useQuery("arrests", getData);
  const [breakdownCol, setBreakdownCol] = useState("arrest_type_description");
  // console.log(prepareData(data));
  // newPrepareData(data);
  const { preparedData, keys } = useMemo(
    () => prepareData(data, breakdownCol),
    [data, breakdownCol]
  );
  console.log({ keys });
  return (
    <div>
      {data && (
        <>
          <div style={{ height: 500 }}>
            <NivoBar
              data={[...preparedData]}
              keys={[...keys]}
              indexBy={"race"}
              yLabel="count"
            />
          </div>
          <div className="controls">
            <select
              value={breakdownCol}
              onChange={(ev) => {
                setBreakdownCol(ev.target.value);
              }}
            >
              <option value="crime_category_description">crime</option>
              <option value="arrest_type_description">arrest type</option>
            </select>
          </div>
        </>
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
