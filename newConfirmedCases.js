const fs = require('fs');
//const logger = require('pino')({level: 'info'})
const logger = require('pino')({level: 'debug'})
const { DateTime } = require("luxon");

const reportDirPath = 'daily_reports';

const readOneFile = async (fileName) => {
	const reportData = await fs.promises.readFile(`${reportDirPath}/${fileName}`, "utf8");
	//logger.debug({
		//fileData: reportData
	//}, 'Loaded report data');

	return reportData;
};

const testRegex = async (fileName) => {
	const content = await readOneFile(fileName);

	const newCasesRegex = [
		RegExp('([0-9]+,[0-9]+|[0-9]+)(?= new confirmed cases)'),
		RegExp('([0-9]+,[0-9]+|[0-9]+)(?= new cases)')
	];
	for (const regEx of newCasesRegex) {
		var numNewCases = content.match(regEx);
		if (numNewCases) {
			break;	
		}
	};
	if (numNewCases) {
		logger.info({
			numNewCases: numNewCases[0]
		}, 'New Cases');

		return numNewCases[0];
	} else {
		logger.info({
			matchNotFound: fileName
		}, 'New Cases match not found');

		return null;
	}
};

const pasrseAllFiles = async () => {
	const finalArray = [];
	const files = await fs.promises.readdir(reportDirPath);
	for (const file of files) {
		logger.debug(file);
		const newCasesCount = await testRegex(file);
		//logger.info({
			//newCasesCount: newCasesCount
		//}, 'Number of new cases');
		const dateString = file.split('.')[0]
		logger.debug({
			dateString: dateString
		}, 'Parsed filename');
		const dt = DateTime.fromFormat(dateString, 'LLLL-d-y');
		const jsDateObj = dt.toJSDate();

		const curObj = {
			'date': jsDateObj,
			'newCases': newCasesCount
		}
		finalArray.push(curObj);
	}

	const sorted = finalArray.sort((a, b) => {
		return a.date - b.date;
	});

	logger.debug({
		finalArray: sorted
	}, 'Final arr of objs');

	return sorted;
};


//const writeFile = async () => {

//};

(async () => {
	const dataArray = await pasrseAllFiles();
	const parsed = JSON.stringify(dataArray, null, 4);
	fs.writeFile(`data/newCases.json`, parsed, (err) => {
		if (err) throw err;
		logger.info(`The new cases file has been saved!`);
	});

})()

