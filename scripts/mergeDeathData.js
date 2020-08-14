const fs = require('fs')
const logger = require('pino')({level: 'info'})

const dataDescription = 'deathMerge';

const dailyDeathData = JSON.parse(fs.readFileSync('11ty_input/_data/dailyDeaths.json', 'utf-8'))
const cumulativeDeathData = JSON.parse(fs.readFileSync('11ty_input/_data/cumulativeDeaths.json', 'utf-8'))

const renameField = (curItem, curIndex) => {
	const newItem = {
		date: curItem.date,
		new: curItem.dataPoint,
		cumulative: cumulativeDeathData[curIndex].dataPoint
	}

	return newItem;
};
const retaged = dailyDeathData.map(renameField);

//const renameAnotherField = (curItem, curIndex) => {
	//curItem.cumulative = cumulativeCasesData[curIndex].dataPoint

	//return curItem;
//};

//const finalArray = retaged.map(renameAnotherField);

//Write the resulting data obj to a file in the 11ty_input dir

const parsed = JSON.stringify(retaged, null, 4);
fs.writeFile(`11ty_input/_data/${dataDescription}.json`, parsed, (err) => {
	if (err) throw err;
	logger.info(`The ${dataDescription} file has been saved!`);
});
