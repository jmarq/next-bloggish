const glob = require("glob");

const validExtensions = /\.(ts|js|md)x?$/;

const hasValidExtension = (path) => path.match(validExtensions);
const isntHidden = (path) => path && path[0] !== "_";
const isntApi = (path) => path && path.slice(0,4) !== "api/"
const isValidPath = (path) => {
  return hasValidExtension(path) && isntHidden(path) && isntApi(path);
};

glob("pages/**/*", (er, files) => {
  stripped = files.map((path) => path.slice(6));
  matches = stripped.filter(isValidPath);
  matches = matches.map(path=> path.replace(validExtensions, ""));
  console.log(matches);
});
