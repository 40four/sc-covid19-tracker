const fs = require('fs')
const logger = require('pino')({level: 'info'})

const dataDescription = 'confirmedCasesMerge';

const cumulativeCasesData = JSON.parse(fs.readFileSync('11ty_input/_data/cumulativeCases.json', 'utf-8'))
const dailyNewCasesData = JSON.parse(fs.readFileSync('11ty_input/_data/newCases.json', 'utf-8'))

const renameField = (curItem) => {
	const newItem = {
		date: curItem.date,
		new: curItem.dataPoint
	}

	return newItem;
};
const retaged = dailyNewCasesData.map(renameField);

const renameAnotherField = (curItem, curIndex) => {
	curItem.cumulative = cumulativeCasesData[curIndex].dataPoint

	return curItem;
};

const finalArray = retaged.map(renameAnotherField);

//Write the resulting data obj to a file in the 11ty_input dir

const parsed = JSON.stringify(finalArray, null, 4);
fs.writeFile(`11ty_input/_data/${dataDescription}.json`, parsed, (err) => {
	if (err) throw err;
	logger.info(`The ${dataDescription} file has been saved!`);
});
