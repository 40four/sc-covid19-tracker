const { parseOneCategory } = require('./parsingTools');

const dataDescription = 'newCases';

const regExCases = [
		RegExp('([0-9]+,[0-9]+|[0-9]+)(?= new confirmed cases)'),
		RegExp('([0-9]+,[0-9]+|[0-9]+)(?= new cases)')
];

parseOneCategory(dataDescription, regExCases);
