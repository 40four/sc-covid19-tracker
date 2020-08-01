const got = require('got');
const cheerio = require('cheerio');
const { DateTime } = require("luxon");
const logger = require('pino')({level: 'info'})


logger.info('Script started');

const oneDayResults = async (formatedDate) => {
	try {
		var response = await got(`https://www.scdhec.gov/news-releases/south-carolina-announces-latest-covid-19-update-${formatedDate}`);
	} catch (error) {
		logger.error({errorMessage: error.response.status}, 'Request failed');
		return;
	}

	const $ = cheerio.load(response.body);
	const content = $('.content-block').text();

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
			foundDate: formatedDate,
			numNewCases: numNewCases[0]
		}, 'New Cases');

		return numNewCases[0];
	} else {
		logger.info({
			notFoundDate: formatedDate
		}, 'New Cases match not found');

		return null;
	}

};

//March 6th first reports
//April 6th first day of new url format
const today = DateTime.local();
const startDt = DateTime.local(2020, 4, 6);

logger.debug({
	today: today,
	startDay: startDt
}, 'Initial dates');

const plusOne = startDt.plus({days: 1});

logger.debug({
	dayPlusOne: plusOne
}, 'Add a day');

const daysDiff = today.diff(startDt, 'days');
const daysDiffNum = daysDiff.toObject().days;
const daysDiffInt = Math.trunc(daysDiffNum);

logger.debug({
	daysDiffInt: daysDiffInt
}, 'Days diff');

const bigArrOfInts = [...Array(daysDiffInt).keys()];
const bigArrOfDts = bigArrOfInts.map((curInt) => {
	return startDt.plus({days: curInt});	
});

logger.debug({
	bigArrOfDts: bigArrOfDts
}, 'Full array of dts');


const bigJsonObj = async () => {
	const coolObj = {};

	for (const day of bigArrOfDts) {
		const urlFormatDate = day.toFormat('LLLL-d-y');
		logger.debug({
			inputDT: day,
			dateFormated: urlFormatDate,
		}, 'Input DT and formated');
		coolObj[urlFormatDate] = {
			newCases: await oneDayResults(urlFormatDate)
		};
	}

	return coolObj;
};


const finalResult = async () => {
	const res = await bigJsonObj();
	logger.info({
		final: res
	}, 'Final results');

	return res;
};

finalResult();


logger.info('Script complete');
