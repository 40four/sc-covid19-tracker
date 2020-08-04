const fs = require('fs');
const logger = require('pino')({level: 'info'})
//const logger = require('pino')({level: 'debug'})
const { DateTime } = require("luxon");

const reportDirPath = 'daily_reports';

exports.parseOneCategory = function(dataDescription, regExCases) {

	const readOneFile = async (fileName) => {
		const reportData = await fs.promises.readFile(`${reportDirPath}/${fileName}`, "utf8");
		//logger.debug({
			//fileData: reportData
		//}, 'Loaded report data');

		return reportData;
	};

	const testRegex = async (fileName, regExCases) => {
		const content = await readOneFile(fileName);

		const regExArray = regExCases;

		for (const regEx of regExArray) {
			var matchResult = content.match(regEx);
			if (matchResult) {
				break;	
			}
		};
		if (matchResult) {
			logger.info({
				matchResult: matchResult[0]
			}, 'RegEx match');

			return matchResult[0];
		} else {
			logger.info({
				matchNotFound: fileName
			}, `${dataDescription} match not found`);

			return null;
		}
	};

	const pasrseAllFiles = async () => {
		const finalArray = [];
		const files = await fs.promises.readdir(reportDirPath);

		for (const file of files) {
			logger.debug(file);
			const regExRes = await testRegex(file, regExCases);
			const dateString = file.split('.')[0]
			logger.debug({
				dateString: dateString
			}, 'Parsed filename');
			const dt = DateTime.fromFormat(dateString, 'LLLL-d-y');
			const jsDateObj = dt.toJSDate();

			const curObj = {
				'date': jsDateObj,
				'dataPoint': regExRes
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


	(async () => {
		const dataArray = await pasrseAllFiles();
		const parsed = JSON.stringify(dataArray, null, 4);
		fs.writeFile(`11ty_input/_data/${dataDescription}.json`, parsed, (err) => {
			if (err) throw err;
			logger.info(`The ${dataDescription} file has been saved!`);
		});

	})()

};

