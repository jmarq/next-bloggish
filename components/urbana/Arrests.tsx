import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const myClient = new QueryClient();


const getData = async () => {
  const response = await fetch("https://data.urbanaillinois.us/resource/afbd-8beq.json");
  const json = await response.json();
  // const result = await response.json();
  return json;
}

const DataViewer = () => {
  const { data, isLoading, error } = useQuery("arrests", getData);
  return (
    <div>
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
}

export default ArrestQuery;