const withPlugins = require("next-compose-plugins");
const nextCss = require("@zeit/next-css");
const optimizedImages = require("next-optimized-images");

module.exports = withPlugins(
  [
    [optimizedImages, {}],
    [nextCss, { cssModules: true }]
    // your other plugins here
  ],
  {
    webpack: (config, { buildId, dev }) => {
      // This allows the app to refer to files through our symlink
      config.resolve.symlinks = false;
      return config;
    }
  }
);
