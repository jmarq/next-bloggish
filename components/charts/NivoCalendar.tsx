import React from "react";
import { ResponsiveCalendar } from "@nivo/calendar";

const NivoCalendar = ({
  height = 400,
  data = [],
  from,
  to,
  onClick = (day, ev) => {},
}) => {
  return (
    <div style={{ height: height}}>
      <ResponsiveCalendar
        data={data}
        // todo: determine from/to extent based on range of data passed in
        from={from}
        to={to}
        onClick={onClick}
        // maybe add color stops to theme data?
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560", "red"]}
        emptyColor="#eeeeee"
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
  );
};

export default NivoCalendar;
