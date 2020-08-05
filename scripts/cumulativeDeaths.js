const { parseOneCategory } = require('./parsingTools');

const dataDescription = 'cumulativeDeaths';

const regExCases = [
		RegExp('(?<=who have died to )([0-9]+,[0-9]+|[0-9]+)'),
		RegExp('(?<=those who have died remains )([0-9]+,[0-9]+|[0-9]+)'),
		RegExp('(?<=confirmed deaths to )([0-9]+,[0-9]+|[0-9]+)'),
];

parseOneCategory(dataDescription, regExCases);
