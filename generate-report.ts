import reporter from "multiple-cucumber-html-reporter";


const executionDate =
new Date()
.toLocaleString();
 
reporter.generate({
 
jsonDir:
"./reports",
 
reportPath:
"./reports/html-report",
 
openReportInBrowser:
true,
 
displayDuration:
true,
 
pageTitle:
"Automation Report",
 
reportName:
"Playwright Cucumber Report",

metadata: {
  browser: {
    name: "Chromium",
    version: "Latest"
  },
  device: "Desktop",
  platform: {
    name: "Windows",
    version: ""
  }
},
 

 
customData:{
 
title:
"Execution Details",
 
data:[
 
{
 
label:
"Execution Date",
 
value:
executionDate
 
},
 

 

 

 
]
 
}
 
});