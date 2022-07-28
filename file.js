// const fs=require("fs");
// const quote="Rhagavi is beautiful";
// fs.writeFile("./awesome.html",quote,(err)=>
// {
//     console.log("Completed Writing😊");
// });


const fs=require("fs");
const quote3="live more worry less";

// console.log(process.argv);
// const[,,noOfFiles]=process.argv;
// for(i=1;i<=noOfFiles;i++)
{
    fs.appendFile ("./fun.html",'\n'+quote3,(err)=>
   {

        console.log("updated");
        }
    )}
