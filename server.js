var express = require('express'); 
var app = express(); 
var port = 3000;
const cors = require("cors");


const cell = '__EMPTY';
const xlsx = require("xlsx");

const excelFile = xlsx.readFile("202112_문화비(코드234)_박경수.xlsx");

const sheetName = excelFile.SheetNames[0];
const firstSheet = excelFile.Sheets[sheetName];

const jsonData = xlsx.utils.sheet_to_json(firstSheet, {defval: ""});


 Object.entries(jsonData[2]).map(([key, value])=> {
  console.log(key, value)
})

console.log(JSON.parse(44552))

// console.log(jsonData[2])




app.post("/getData", function(req,res) {
  return res.json(jsonData)
})

app.get('/', function(req, res) { 
  res.sendFile(__dirname+ '/index.html');
});

app.get('/getData', function(req,res) {
  // console.log(res.jsonData)
  return res.json(jsonData)
})
app.listen(port, function(){ 
  console.log('server on! http://localhost:'+port);
});