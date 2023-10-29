const { resolve } = require("path");

function getReqData(req){
    return new Promise((resolve,reject)=>{
        try{
            let body="";
            req.on("data",(chunk)=>{
                body += chunk.toString();
            });
            req.on("end",()=>{
                // console.log(JSON.parse(body));
                resolve(JSON.parse(body));
            })
        }catch(error){
            reject(error);
        }
    })
}

module.exports = { getReqData };