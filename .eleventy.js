const { DateTime } = require("luxon");

// docs: https://www.11ty.io/docs/config
module.exports = function(config) {
  config.addShortcode("year", dateObj => {
    return DateTime.local().toFormat('yyyy');
  });

  config.addWatchTarget('./src/assets');
  config.addLayoutAlias('default', 'default.njk');

  config.addPassthroughCopy('src/robots.txt');
  config.addPassthroughCopy('src/site.webmanifest');
  config.addPassthroughCopy('src/assets/images');
  config.addPassthroughCopy('src/assets/fonts');

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "includes",
      layouts: "layouts",
      data: "data"
    },
    templateFormats: ['njk', 'html'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};
