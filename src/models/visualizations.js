const database = require("../connect");
let   visualization = undefined

try{
    if(database!==undefined){
        visualization = database.collection('visualizations');
    }else{
        console.log("database is undefined")
    }
}catch (e){
    console.log(e)
}

module.exports  = visualization 