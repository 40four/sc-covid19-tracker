const { parseOneCategory } = require('./parsingTools');

const dataDescription = 'dailyTestsCompleted';

const regExCases = [
		RegExp('(?<=tested yesterday statewide was )([0-9]+,[0-9]+|[0-9]+)'),
		RegExp('(?<=tests performed yesterday statewide was )([0-9]+,[0-9]+|[0-9]+)'),
		RegExp('(?<=DHEC yesterday statewide was )([0-9]+,[0-9]+|[0-9]+)'),
		RegExp('(?<=for yesterday, )([0-9]+,[0-9]+|[0-9]+)(?=\\), then multiplied)'),
];

parseOneCategory(dataDescription, regExCases);
