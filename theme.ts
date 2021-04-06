// keep an eye on this development. are colors the only things likely to change between themes?
//  what else? fonts? borders? spacing? hmmm...
//  maybe we can just pass in color scheme as an arg.
export const theme1Generator = () => {
  const colors = {
    primary: "#95bbff",
    secondary: "#222",
    accent: "#ff5acb",
  };
  const shadows = {
    medium: `5px 5px 5px ${colors.accent}`,
  };
  const breakpoints = ["500px", "800px"];

  return {
    colors,
    shadows,
    breakpoints,
  };
};

export const theme2Generator = () => {
  const colors = {
    primary: "#bfa",
    secondary: "#003",
    accent: "#c58aec",
  };
  const shadows = {
    medium: `5px 5px 5px ${colors.accent}`,
  };
  const breakpoints = ["500px", "800px"];
  return {
    colors,
    shadows,
    breakpoints,
  };
};

export const theme1 = theme1Generator();
export const theme2 = theme2Generator();
