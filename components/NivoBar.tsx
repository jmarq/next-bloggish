// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from "@nivo/bar";
import { ThemeContext } from "styled-components";
import { useContext } from "react";
const data = [
  {
    country: "AD",
    "hot dog": 58,
    "hot dogColor": "hsl(308, 70%, 50%)",
    burger: 148,
    burgerColor: "hsl(69, 70%, 50%)",
    sandwich: 145,
    sandwichColor: "hsl(45, 70%, 50%)",
    kebab: 197,
    kebabColor: "hsl(127, 70%, 50%)",
    fries: 60,
    friesColor: "hsl(44, 70%, 50%)",
    donut: 145,
    donutColor: "hsl(49, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 16,
    "hot dogColor": "hsl(18, 70%, 50%)",
    burger: 27,
    burgerColor: "hsl(157, 70%, 50%)",
    sandwich: 135,
    sandwichColor: "hsl(105, 70%, 50%)",
    kebab: 124,
    kebabColor: "hsl(294, 70%, 50%)",
    fries: 56,
    friesColor: "hsl(346, 70%, 50%)",
    donut: 25,
    donutColor: "hsl(333, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 58,
    "hot dogColor": "hsl(149, 70%, 50%)",
    burger: 91,
    burgerColor: "hsl(348, 70%, 50%)",
    sandwich: 167,
    sandwichColor: "hsl(251, 70%, 50%)",
    kebab: 147,
    kebabColor: "hsl(184, 70%, 50%)",
    fries: 111,
    friesColor: "hsl(79, 70%, 50%)",
    donut: 80,
    donutColor: "hsl(356, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 21,
    "hot dogColor": "hsl(74, 70%, 50%)",
    burger: 193,
    burgerColor: "hsl(311, 70%, 50%)",
    sandwich: 155,
    sandwichColor: "hsl(139, 70%, 50%)",
    kebab: 76,
    kebabColor: "hsl(176, 70%, 50%)",
    fries: 122,
    friesColor: "hsl(91, 70%, 50%)",
    donut: 33,
    donutColor: "hsl(300, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 115,
    "hot dogColor": "hsl(295, 70%, 50%)",
    burger: 16,
    burgerColor: "hsl(185, 70%, 50%)",
    sandwich: 10,
    sandwichColor: "hsl(8, 70%, 50%)",
    kebab: 160,
    kebabColor: "hsl(357, 70%, 50%)",
    fries: 23,
    friesColor: "hsl(241, 70%, 50%)",
    donut: 108,
    donutColor: "hsl(150, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 132,
    "hot dogColor": "hsl(135, 70%, 50%)",
    burger: 10,
    burgerColor: "hsl(222, 70%, 50%)",
    sandwich: 179,
    sandwichColor: "hsl(140, 70%, 50%)",
    kebab: 138,
    kebabColor: "hsl(193, 70%, 50%)",
    fries: 36,
    friesColor: "hsl(217, 70%, 50%)",
    donut: 128,
    donutColor: "hsl(261, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 164,
    "hot dogColor": "hsl(150, 70%, 50%)",
    burger: 125,
    burgerColor: "hsl(26, 70%, 50%)",
    sandwich: 42,
    sandwichColor: "hsl(341, 70%, 50%)",
    kebab: 39,
    kebabColor: "hsl(45, 70%, 50%)",
    fries: 173,
    friesColor: "hsl(13, 70%, 50%)",
    donut: 6,
    donutColor: "hsl(146, 70%, 50%)",
  },
];
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const NivoBar = (
  {
    /* see data tab */
  }
) => {
  const themeContext = useContext(ThemeContext);
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
      keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: themeContext?.nivoColors || "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "food",
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
