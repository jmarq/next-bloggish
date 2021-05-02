import { useContext } from "react";
import { VegaLite } from "react-vega";
import { TopLevelSpec } from "vega-lite";
import { ThemeContext } from "styled-components";

const VegaBar = ({data=undefined, themeColor="accent"}) => {
  const theme = useContext(ThemeContext);

  const spec: TopLevelSpec = {
    width: 400,
    height: 200,
    mark: "bar",
    encoding: {
      x: { field: "a", type: "ordinal" },
      y: { field: "b", type: "quantitative" },
      color: { value: theme.colors[themeColor] },
    },
    data: { name: "data" }, // note: vega-lite data attribute is a plain object instead of an array
  };

  const barData = {
    data: data || [
      { a: "A", b: 28 },
      { a: "B", b: 55 },
      { a: "C", b: 43 },
      { a: "D", b: 91 },
      { a: "E", b: 81 },
      { a: "F", b: 53 },
      { a: "G", b: 19 },
      { a: "H", b: 87 },
      { a: "I", b: 52 },
    ],
  };

  return <VegaLite spec={spec} data={barData} />;
};

export default VegaBar;
