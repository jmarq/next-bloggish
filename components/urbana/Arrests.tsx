import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import _ from "lodash";
import NivoBar from "components/NivoBar";

const myClient = new QueryClient();

const getData = async () => {
  const response = await fetch(
    "https://data.urbanaillinois.us/resource/afbd-8beq.json"
  );
  const json = await response.json();
  // const result = await response.json();
  // return json.map((el) => ({
  //   age_at_arrest: Number(el.age_at_arrest),
  //   year_of_arrest: el.year_of_arrest,
  //   arrest_code: el.arrest_code
  // }));
  return json;
};

const prepareData = (data) => {
  const grouped = _.groupBy(data, "arrestee_sex");
  const results = Object.entries(grouped).map((el) => ({
    race: el[0],
    count: el[1].length,
  }));
  return results;
};

const DataViewer = () => {
  const { data, isLoading, error } = useQuery("arrests", getData);
  console.log(prepareData(data));
  const preparedData = prepareData(data);
  return (
    <div>
      {data && (
        <div style={{ height: 500 }}>
          <NivoBar
            data={preparedData}
            keys={["count"]}
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
