const { parseOneCategory } = require('./parsingTools');

const dataDescription = 'cumulativeCases';

const regExCases = [
		RegExp('(?<=COVID-19 in South Carolina to )([0-9]+,[0-9]+|[0-9]+)'),
		RegExp('(?<=number of people confirmed cases to )([0-9]+,[0-9]+|[0-9]+)'),
		RegExp('(?<=total number of confirmed cases to )([0-9]+,[0-9]+|[0-9]+)')
];

parseOneCategory(dataDescription, regExCases);
