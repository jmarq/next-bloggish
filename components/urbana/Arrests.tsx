import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import NivoBar from "components/NivoBar";

const myClient = new QueryClient();

const getData = async () => {
  const response = await fetch(
    "https://data.urbanaillinois.us/resource/afbd-8beq.json"
  );
  const json = await response.json();
  // const result = await response.json();
  return json.map((el) => ({
    age_at_arrest: Number(el.age_at_arrest),
    year_of_arrest: el.year_of_arrest,
    arrest_code: el.arrest_code
  }));
};

const DataViewer = () => {
  const { data, isLoading, error } = useQuery("arrests", getData);
  return (
    <div>
      {data && (
        <div
          style={{ height: 500 }}
        >
          <NivoBar
            data={data}
            keys={["age_at_arrest"]}
            indexBy={"arrest_code"}
            canvas
          />
        </div>
      )}
      {JSON.stringify(data)}
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
