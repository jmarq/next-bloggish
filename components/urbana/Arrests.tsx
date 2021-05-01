import React, { useMemo, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { from } from "arquero";
import { ResponsiveCalendar } from "@nivo/calendar";
import NivoBar from "components/charts/NivoBar";
import NivoCalendar from "components/charts/NivoCalendar";

const myClient = new QueryClient();
const getData = async () => {
  const response = await fetch(
    "https://data.urbanaillinois.us/resource/afbd-8beq.json"
    // "https://data.urbanaillinois.us/resource/afbd-8beq.json?arrest_type_description=ON%20VIEW&$order=date_of_arrest%20DESC"
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

const prepareCalendarData = (data, dateFilter = undefined) => {
  let results = [];
  if (data) {
    const dataWithDates = fixDates(data);
    let calendarTable = from(dataWithDates);
    calendarTable = calendarTable.rename({
      arrestee_sex: "race",
      arrestee_race: "sex",
    });
    if (dateFilter) {
      calendarTable = calendarTable
        .params({ dateFilterParam: dateFilter })
        .filter((d, $) => d.date == $.dateFilterParam)
        .reify();
    }
    const groupedByDate = calendarTable
      .groupby("date")
      .count({ as: "value" })
      .rename({ date: "day" })
      .objects({ grouped: "entries" });
    results = groupedByDate;
  }
  return results;
};

const prepareData = (
  data,
  breakdownColumn = "crime_category_description",
  dateFilter = undefined
) => {
  console.log("preparing data");
  if (data) {
    console.log("have data to prepare");
    console.log({ breakdownColumn });
    let keys = data.map((d) => d[breakdownColumn]);
    keys = Array.from(new Set(keys));
    const dataWithDates = fixDates(data);
    console.log(dataWithDates);

    let table = from(dataWithDates);
    // sigh. the Urbana data portal seems to have swapped these two columns after a certain date
    table = table.rename({ arrestee_sex: "race", arrestee_race: "sex" });
    if (dateFilter) {
      table = table
        .params({ dateFilterParam: dateFilter })
        .filter((d, $) => d.date == $.dateFilterParam)
        .reify();
    }

    const groupedObjects = table
      .groupby("race", breakdownColumn)
      .count()
      // make sure all combos of race/column are represented with at least zeroes
      .impute({ count: () => 0 }, { expand: ["race", breakdownColumn] })
      .groupby("race")
      .pivot(breakdownColumn, "count")
      .objects({ grouped: true });

    return {
      preparedData: groupedObjects,
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
  const [filteredDate, setFilteredDate] = useState(undefined);

  const { preparedData, keys } = useMemo(
    () => prepareData(data, breakdownCol, filteredDate),
    [data, breakdownCol, filteredDate]
  );

  const calendarData = useMemo(() => {
    return prepareCalendarData(data, filteredDate);
  }, [data, filteredDate]);
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
          <div style={{ backgroundColor: "#ccc" }}>
            <NivoCalendar
              height={400}
              data={calendarData}
              // todo: determine from/to extent based on range of data passed in
              from="2021-01-01"
              to="2021-04-30"
              onClick={(day, _ev) => {
                if (filteredDate) {
                  setFilteredDate(undefined);
                } else {
                  setFilteredDate(day.day);
                }
              }}
            />
          </div>
        </>
      )}
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
