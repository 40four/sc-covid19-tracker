#!/bin/bash

node scripts/newsReportScraper.js

node scripts/runAllParsers.js

node scripts/mergeCaseData.js

node scripts/mergeDeathData.js

node scripts/mergeTestData.js

npx @11ty/eleventy
