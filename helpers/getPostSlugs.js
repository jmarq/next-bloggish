const glob = require('glob');
glob("pages/**/*", (er, files) => {
  console.log(files);
});

