module.exports = function(eleventyConfig) {
	return {
		dir: {
			input: "11ty_input",
			output: "11ty_output"
		},
		"dataTemplateEngine": "njk"
	};
};
