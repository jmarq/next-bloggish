const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  exportTrailingSlash: true,
  // webpack 5 seems to break arquero, because of an import/export issue
  // webpack 4 seems to choke on ?? operator from vega. how to correctly use babel loaders for node modules in next?
  // stalemate for now...
  future: { webpack5: true }
})