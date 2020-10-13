const { DateTime } = require("luxon");

// @docs : config
// https://www.11ty.io/docs/config
module.exports = function(config) {
	config.addLayoutAlias('default', 'default.njk');

	config.addShortcode("year", dateObj => {
		return DateTime.local().toFormat('yyyy');
	});

	// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
	config.addFilter('htmlDateString', (dateObj) => {
		return DateTime.fromJSDate(dateObj).toFormat('yyyy-LL-dd');
	});

	config.addWatchTarget('./src/assets');

	config.addPassthroughCopy('src/robots.txt');
	config.addPassthroughCopy('src/humans.txt');
	config.addPassthroughCopy('src/assets/css/main.css');
	config.addPassthroughCopy('src/assets/images');

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
