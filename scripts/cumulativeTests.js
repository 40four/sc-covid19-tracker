const { parseOneCategory } = require('./parsingTools');

const dataDescription = 'cumulativeTestsCompleted';

const regExCases = [
		//RegExp('(?<=Laboratory has conducted )([0-9]+,[0-9]+|[0-9]+)'),
		RegExp('(?<=a total of )([0-9]+,[0-9]+|[0-9]+)'),
		RegExp('(?<=A total of )([0-9]+,[0-9]+|[0-9]+)'),
		//RegExp('(?<=for yesterday, )([0-9]+,[0-9]+|[0-9]+)(?=\\), then multiplied)'),
];

parseOneCategory(dataDescription, regExCases);
