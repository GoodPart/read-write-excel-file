var express = require('express'); 
var app = express(); 
var port = 3000;
const cors = require("cors");


const cell = '__EMPTY';
const xlsx = require("xlsx");
const fs = require('fs');
const dir = 'testData';

let files = fs.readdirSync(dir);
const fileArray = files;
// console.log('디렉토리 구조 array',fileArray )

let mergeObject = [];

let distObject = [];


fileArray.map((item, index1)=> {
  let xlxsData = []; // 데이터를 받을 리스트(1.xlxs, 2.xlxs ...)

  
  const excelFile = xlsx.readFile(`./testData/${item}`);

  const sheetName = excelFile.SheetNames[0];
  const firstSheet = excelFile.Sheets[sheetName];

  const jsonData = xlsx.utils.sheet_to_json(firstSheet, {header: 1, raw: false });

  const getBankInfo = {
    data0 : firstSheet['E25'].v,
    data1 : firstSheet['B28'].v,
    data2 : firstSheet['D28'].v,
    data3 : firstSheet['E28'].v
  }
  // console.log(getBankInfo)


  console.log(`${index1} 번째 xlsx 파일 시작.`)

  const getXlxsValue = Object.entries(jsonData).map(([key, value], index)=> {
    // key0 = 코드 번호
    // key1 = head값(번호 ,일자, 내용 ,금액, 영수증, 비고)
  
    console.log("map 실행")
      
      if(key >=3 && key<=22) {
  
        if(value[1] == undefined) {
          // console.log("데이터가 없음------------------")
        }
        else {
          const data2 = {
            data0 : value[0],
            data1 : value[1],
            data2 : value[2],
            data3 : value[3],
            data4 : value[4],
            data5 : getBankInfo
          }
          xlxsData.push(data2)
        }
        
      }
      
    })
    
  mergeObject = mergeObject.concat({xlxsData})
  console.log(`${index1} 번째 xlsx 파일 종료 ${xlxsData.length}-------------.`)

  if(index1 == fileArray.length) {
    return mergeObject 
  }
})








// const excelFile = xlsx.readFile("./testData/202112_문화비(코드234)_박경수.xlsx");

// const sheetName = excelFile.SheetNames[0];
// const firstSheet = excelFile.Sheets[sheetName];

// const jsonData = xlsx.utils.sheet_to_json(firstSheet, {header: 1, raw: false });

// const getBankInfo = {
//   data0 : firstSheet['E25'].v,
//   data1 : firstSheet['B28'].v,
//   data2 : firstSheet['D28'].v,
//   data3 : firstSheet['E28'].v
// }

// let globalIndex = 1;

// let globalData = []; // 데이터를 받을 리스트(1.xlxs, 2.xlxs ...)

// const getXlxsValue = Object.entries(jsonData).map(([key, value], index)=> {
//   // key0 = 코드 번호
//   // key1 = head값(번호 ,일자, 내용 ,금액, 영수증, 비고)

//   let innerDataArray = [];

    
    
//     if(key >=3 && key<=22) {

//       if(value[1] == undefined) {
//         // console.log("데이터가 없음------------------")
//       }
//       else {
//         const data2 = {
//           // globalIndex: globalIndex,
//           data0 : value[0],
//           data1 : value[1],
//           data2 : value[2],
//           data3 : value[3],
//           data4 : value[4],
//           data5 : getBankInfo
//         }
//         // console.log('3이상 22이하',data2)
//         const result = globalData.push(data2);
//          return result;

//       }
      
//       globalIndex += 1;

      

//     }
// })





// app.post("/getData", function(req,res) {
//   return res.json(jsonData)
// })
app.post('/', function(req,res) {
  // console.log(res.jsonData)
  return res.json(mergeObject)
})

app.get('/', function(req, res) { 
  res.sendFile(__dirname+ '/index.html');
});

app.listen(port, function(){ 
  console.log('server on! http://localhost:'+port);
});