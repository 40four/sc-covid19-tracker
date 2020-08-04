const got = require('got');
const cheerio = require('cheerio');
const { DateTime } = require("luxon");
const logger = require('pino')({level: 'info'})
const fs = require('fs');

logger.info('Script started');

const scrapeOneDay = async (formatedDate) => {
	try {
		var response = await got(`https://www.scdhec.gov/news-releases/south-` +
			`carolina-announces-latest-covid-19-update-${formatedDate}`);
	} catch (error) {
		logger.error({errorMessage: error.response.status}, 'Request failed');
		return null;
	}

	const $ = cheerio.load(response.body);
	const content = $('.content-block').text();

	return content
}

//March 6th first reports
//April 6th first day of new url format

//Make a date obj for today, and April 6th
const today = DateTime.local();
const startDt = DateTime.local(2020, 4, 6);
logger.debug({
	today: today,
	startDay: startDt
}, 'Initial dates');

//Get the difference, in days, of today and the start day
const daysDiff = today.diff(startDt, 'days');
const daysDiffNum = daysDiff.toObject().days;
const daysDiffInt = Math.trunc(daysDiffNum);
logger.debug({
	daysDiffInt: daysDiffInt
}, 'Days diff');

//Create an array of luxon date objects for every day
const arrayOfInts = [...Array(daysDiffInt).keys()];
const arrayOfDts = arrayOfInts.map((curInt) => {
	return startDt.plus({days: curInt});	
});
logger.debug({
	arrayOfDts: arrayOfDts
}, 'Full array of dts');

//Iterate all the days, and write the content to a file
const writeFiles = (async () => {
	for (const day of arrayOfDts) {
		const urlFormatDate = day.toFormat('LLLL-d-y');
		logger.debug({
			inputDT: day,
			dateFormated: urlFormatDate,
		}, 'Input DT and formated');

		const reportContent = await scrapeOneDay(urlFormatDate);

		fs.writeFile(`daily_reports/${urlFormatDate}.txt`, reportContent, (err) => {
			if (err) throw err;
			logger.info(`The ${urlFormatDate} file has been saved!`);
		});
	}
})();
