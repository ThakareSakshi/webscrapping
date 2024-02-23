const axios = require('axios');
const cheerio = require('cheerio');
const xlsx = require('xlsx');
const workbook = xlsx.utils.book_new();


let jobTitles=[];
let companyname=[];
let locations=[];
let salaries=[];

let sheetData=[];
const html = '<div><a href="https://example.com">Link 1</a><a href="https://example2.com">Link 2</a></div>';
const $ = cheerio.load(html);

const get_Data=async()=>{
try{
    const response=await axios.get('https://apna.co/jobs/freshers-jobs?sourcePage=Home+Page')
  
    const $ =  cheerio.load(response.data);
    const titles = $(".JobListCardstyles__HeaderLeftSection-ffng7u-3.nLCuf");
    titles.each((index, data) => {
        console.log(index);
        jobTitles.push({ title: $(data).text() });
        console.log(jobTitles);
       
      });
      
      
      const companydata= $(".JobListCardstyles__JobCompany-ffng7u-8.gguURM").each((index, data) => {
        companyname.push({ company: $(data).text() });
       
      });

      const locationData= $(".JobListCardstyles__DisplayFlexCenter-ffng7u-10.BmLKA").each((index, data) => {
        locations.push({ location: $(data).text() });
       
      });

      const salariesData= $(".JobListCardstyles__DisplayFlexCenter-ffng7u-10.BmLKA").each((index, data) => {
        salaries.push({ company: $(data).text() });
       
      });

      const workSheet = xlsx.utils.json_to_sheet(jobTitles);
      xlsx.utils.book_append_sheet(workbook, workSheet, "Sheet1");
    //   xlsx.writeFile(workbook, "output.xlsx");

    const workSheet3 = xlsx.utils.json_to_sheet(companyname);
      xlsx.utils.book_append_sheet(workbook, workSheet3, "Sheet3");
    //   xlsx.writeFile(workbook, "output.xlsx");

      const workSheet2 = xlsx.utils.json_to_sheet(salaries);
      xlsx.utils.book_append_sheet(workbook, workSheet2, "Sheet2");
      xlsx.writeFile(workbook, "output.xlsx");
    }
  catch(e){
    console.log("error",e)
  };
}

  get_Data();