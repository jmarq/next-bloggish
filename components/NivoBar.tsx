// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar, ResponsiveBarCanvas } from "@nivo/bar";
import { ThemeContext } from "styled-components";
import { useContext, useState } from "react";
import foodData from "data/food.json";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
const NivoBar = ({
  data = foodData,
  keys = ["hot dog", "burger", "sandwich", "kebab", "fries", "donut"],
  indexBy = "country",
  yLabel = "hot dog",
}) => {
  const themeContext = useContext(ThemeContext);
  const startingKeys = keys;
  const [currentKeys, setCurrentKeys] = useState(startingKeys);
  const [barColor, setBarColor] = useState(undefined);
  return (
    <ResponsiveBar
      theme={{
        textColor: themeContext.colors.primary,
        fontSize: 16,
        tooltip: {
          container: {
            background: themeContext.colors.secondary,
            color: themeContext.colors.accent,
          },
        },
      }}
      data={data}
      keys={currentKeys}
      indexBy={indexBy}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={barColor || { scheme: themeContext?.nivoColors || "nivo" }}
      onClick={(node, event) => {
        console.log(node, event);
      }}
      // defs={[
      //   {
      //     id: "dots",
      //     type: "patternDots",
      //     background: "inherit",
      //     color: "#38bcb2",
      //     size: 4,
      //     padding: 1,
      //     stagger: true,
      //   },
      //   {
      //     id: "lines",
      //     type: "patternLines",
      //     background: "inherit",
      //     color: "#eed312",
      //     rotation: -45,
      //     lineWidth: 6,
      //     spacing: 10,
      //   },
      // ]}
      // fill={[
      //   {
      //     match: {
      //       id: "fries",
      //     },
      //     id: "dots",
      //   },
      //   {
      //     match: {
      //       id: "sandwich",
      //     },
      //     id: "lines",
      //   },
      // ]}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // indexBy?
        legend: indexBy,
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // keys[0] or ??
        legend: yLabel,
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          onClick: (data, ev) => {
            // data has color info in it.
            // perhaps we could use this to keep the bar colors consistent after removing other keys.
            console.log(data, ev);
            if (JSON.stringify(currentKeys) == JSON.stringify([data.label])) {
              setCurrentKeys(startingKeys);
              setBarColor(undefined);
            } else {
              setCurrentKeys([data.label]);
              setBarColor(data.color)
            }
          },
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

export default NivoBar;
