
const fs = require('fs')
const logger = require('pino')({level: 'info'})

const dataDescription = 'testMerge';

const dailyTestData = JSON.parse(fs.readFileSync('11ty_input/_data/dailyTestsCompleted.json', 'utf-8'))
const cumulativeTestData = JSON.parse(fs.readFileSync('11ty_input/_data/cumulativeTestsCompleted.json', 'utf-8'))

const renameField = (curItem, curIndex) => {
	const newItem = {
		date: curItem.date,
		new: curItem.dataPoint,
		cumulative: cumulativeTestData[curIndex].dataPoint
	}

	return newItem;
};
const retaged = dailyTestData.map(renameField);

//Write the resulting data obj to a file in the 11ty_input dir
const parsed = JSON.stringify(retaged, null, 4);
fs.writeFile(`11ty_input/_data/${dataDescription}.json`, parsed, (err) => {
	if (err) throw err;
	logger.info(`The ${dataDescription} file has been saved!`);
});
