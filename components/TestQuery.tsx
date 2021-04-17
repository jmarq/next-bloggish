import React from "react";
import { Query, QueryClient, QueryClientProvider, useQuery } from "react-query";

const myClient = new QueryClient();

const resolveLater = () => {
  const result = new Promise<{name: string}>((resolve, reject) => {
    setTimeout(() => resolve({name: "Jeffy"}), 500);
    // reject("oh no");
  });
  return result;
};

const getData = async () => {
  const response = await resolveLater();
  // const result = await response.json();
  return response;
}

const DataViewer = () => {
  const { data, isLoading, error } = useQuery("myQuery", getData);
  return (
    <div>
      <h1>data: {data?.name}</h1>
      <h1>loading: {isLoading ? "true" : "false"}</h1>
      <h1>error: {error}</h1>
    </div>
  );
};

const TestQuery = () => {
  return (
    <QueryClientProvider client={myClient}>
      <DataViewer></DataViewer>
    </QueryClientProvider>
  );
}

export default TestQuery;