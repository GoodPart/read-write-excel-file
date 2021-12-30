var express = require('express'); 
var app = express(); 
var port = 3000;
const cors = require("cors");


const cell = '__EMPTY';
const xlsx = require("xlsx");

const excelFile = xlsx.readFile("./testData/202112_문화비(코드234)_박경수.xlsx");

const sheetName = excelFile.SheetNames[0];
const firstSheet = excelFile.Sheets[sheetName];

const jsonData = xlsx.utils.sheet_to_json(firstSheet, {raw: false,});

let globalObject = [];

let globalData = []; // 데이터를 받을 리스트(1.xlxs, 2.xlxs ...)

const getXlxsValue = Object.entries(jsonData).map(([key, value], index)=> {
  // key0 = 코드 번호
  // key1 = head값(번호 ,일자, 내용 ,금액, 영수증, 비고)

  let innerDataArray = [];

    const data = {
      data0 : value.__EMPTY,
      data1 : value.__EMPTY_1,
      data2 : value.__EMPTY_2,
      data3 : value.__EMPTY_3,
    }
    
    const result = globalData.push(data);

    console.log(jsonData.length, index)

    return result;
})

console.log(globalData[1]) // head
console.log(globalData[2])





// app.post("/getData", function(req,res) {
//   return res.json(jsonData)
// })
app.post('/', function(req,res) {
  // console.log(res.jsonData)
  return res.json(globalData)
})

app.get('/', function(req, res) { 
  res.sendFile(__dirname+ '/index.html');
});

app.listen(port, function(){ 
  console.log('server on! http://localhost:'+port);
});