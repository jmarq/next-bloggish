import React, { useMemo, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import _, { set } from "lodash";
import { from } from "arquero";
import { ResponsiveCalendar } from "@nivo/calendar";
import NivoBar from "components/NivoBar";

const myClient = new QueryClient();
const getData = async () => {
  const response = await fetch(
    "https://data.urbanaillinois.us/resource/afbd-8beq.json"
  );
  const json = await response.json();
  return json;
};

const fixDates = (data) => {
  return data.map((row) => ({
    ...row,
    // date: new Date(row.date_of_arrest).toLocaleDateString("en-us",{month:"2-digit",day:"2-digit",year:"numeric"}).replaceAll("/","-"),
    date: row.date_of_arrest.slice(0, 10), //YYYY-MM-DD
  }));
};

// for calendar, we want
/*
Array<{
    day:   string // format must be YYYY-MM-DD,
    value: number //count
}>
*/

const prepareCalendarData = (data) => {
  let results = [];
  if (data) {
    const dataWithDates = fixDates(data);
    let calendarTable = from(dataWithDates);
    calendarTable = calendarTable.rename({
      arrestee_sex: "race",
      arrestee_race: "sex",
    });
    const groupedByDate = calendarTable
      .groupby("date")
      .count({ as: "value" })
      .rename({ date: "day" })
      .objects({ grouped: "entries" });
    results = groupedByDate;
  }
  return results;
};

const prepareData = (data, breakdownColumn = "crime_category_description") => {
  console.log("preparing data");
  if (data) {
    console.log("have data to prepare");
    console.log({ breakdownColumn });
    let keys = data.map((d) => d[breakdownColumn]);
    keys = Array.from(new Set(keys));
    const dataWithDates = fixDates(data);
    console.log(dataWithDates);

    let table = from(dataWithDates);
    // sigh
    table = table.rename({ arrestee_sex: "race", arrestee_race: "sex" });
    /*
    new Date(d).toLocaleDateString("en-us",{month:"2-digit",day:"2-digit",year:"numeric"}).replaceAll("/","-")
    */
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

const DataViewer = () => {
  const { data, isLoading, error } = useQuery("arrests", getData);
  const [breakdownCol, setBreakdownCol] = useState("arrest_type_description");
  // console.log(prepareData(data));
  // newPrepareData(data);
  const { preparedData, keys } = useMemo(
    () => prepareData(data, breakdownCol),
    [data, breakdownCol]
  );

  const calendarData = useMemo(() => {
    return prepareCalendarData(data);
  }, [data]);
  console.log({ calendarData });
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
          <div style={{ height: 400, backgroundColor: "#ddd" }}>
            {/* maybe add a NivoCalendar component to abstract away sensible defaults */}
            <ResponsiveCalendar
              data={calendarData}
              // todo: determine from/to extent based on range of data passed in
              from="2021-01-01"
              to="2021-04-30"
              emptyColor="#eeeeee"
              // maybe add color stops to theme data?
              colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560", "red"]}
              margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
              yearSpacing={40}
              monthBorderColor="#888"
              monthBorderWidth={1}
              dayBorderWidth={2}
              dayBorderColor="#ffffff"
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "row",
                  // this seems odd, why was the legend originally so far down?
                  translateY: -36,
                  itemCount: 4,
                  itemWidth: 42,
                  itemHeight: 36,
                  itemsSpacing: 14,
                  itemDirection: "right-to-left",
                },
              ]}
            />
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
