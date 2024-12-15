
// const database = require('../Connect')
const database = require("../connect");
let   user = undefined

try{
    if(database!==undefined){
        user = database.collection('users');
    }else{
        console.log("database is undefined")
    }
}catch (e){
    console.log(e)
}

module.exports  = user 