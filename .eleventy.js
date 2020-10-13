const { DateTime } = require("luxon");
const fs = require("fs");

// @docs : config
// https://www.11ty.io/docs/config
module.exports = function(config) {
	config.addLayoutAlias('default', 'default.njk');
	config.addLayoutAlias("post", "post.njk");

	config.setDataDeepMerge(true);

	config.addShortcode("year", dateObj => {
		return DateTime.local().toFormat('yyyy');
	});

	config.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });

	// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
	config.addFilter('htmlDateString', (dateObj) => {
		return DateTime.fromJSDate(dateObj).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
  config.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
	});
	
	config.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function(item) {
      if( "tags" in item.data ) {
        let tags = item.data.tags;

        tags = tags.filter(function(item) {
          switch(item) {
            // this list should match the `filter` list in tags.njk
            case "all":
            case "nav":
            case "post":
            case "posts":
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
  });

	config.addWatchTarget('./src/assets');

	config.addPassthroughCopy('src/robots.txt');
	config.addPassthroughCopy('src/humans.txt');
	config.addPassthroughCopy('src/assets');

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
