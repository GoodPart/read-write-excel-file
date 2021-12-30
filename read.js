const axios = require("axios");

const xlsx = require("xlsx");

const excelFile = xlsx.readFile("202112_문화비(코드234)_박경수.xlsx");

const sheetName = excelFile.SheetNames[0];
const firstSheet = excelFile.Sheets[sheetName];

const jsonData = xlsx.utils.sheet_to_json(firstSheet, {defval: ""});
