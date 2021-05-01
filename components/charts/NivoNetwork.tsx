import { ResponsiveNetwork } from "@nivo/network";
import { ThemeContext } from "styled-components";
import { useContext, useState } from "react";
import networkData from "data/network.json";

const NivoNetwork = ({ data = networkData }) => {
  return (
    <ResponsiveNetwork
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      nodes={data.nodes}
      links={data.links}
      repulsivity={6}
      iterations={60}
      nodeColor={function (e) {
        return e.color || "red";
      }}
      nodeBorderWidth={1}
      // nodeBorderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
      // nodeBorderColor={"white"}
      linkColor={function (e) {
        return e.color || "#ccc";
      }}
      linkThickness={function (e) {
        return 2 * (2 - e.source.depth || 1);
      }}
      motionStiffness={160}
      motionDamping={12}
    />
  );
};

export default NivoNetwork;
