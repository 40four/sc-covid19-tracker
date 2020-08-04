const { parseOneCategory } = require('./parsingTools');

const dataDescription = 'dailyDeaths';

const regExCases = [
		RegExp('(?<=and )([0-9]+,[0-9]+|[0-9]+)(?= additional deaths)'),
		RegExp('(?<=and )([0-9]+,[0-9]+|[0-9]+)(?= additional death)'),
		RegExp('(?<=and )([0-9]+,[0-9]+|[0-9]+)(?= additional confirmed deaths)'),
		RegExp('(?<=and )([0-9]+,[0-9]+|[0-9]+)(?= additional confirmed death)'),
		RegExp('(?<=including )([0-9]+,[0-9]+|[0-9]+)(?= additional deaths)'),
		RegExp('(?<=including )[a-z]+(?= additional deaths)'),
		RegExp('(?<=and )[a-z]+(?= additional deaths)'),
		RegExp('(?<=and )[a-z]+(?= additional death)'),
		//RegExp('(?<=and )[a-z]+(?= additional confirmed deaths)'),
		//RegExp('(?<=and )[a-z]+(?= additional confirmed death)'),
		RegExp('[a-z]+(?= additional confirmed deaths)'),
		RegExp('[a-z]+(?= additional confirmed death)'),
		RegExp('([0-9]+,[0-9]+|[0-9]+)(?= additional confirmed deaths)'),
		RegExp('([0-9]+,[0-9]+|[0-9]+)(?= additional confirmed death)'),
];

parseOneCategory(dataDescription, regExCases);
