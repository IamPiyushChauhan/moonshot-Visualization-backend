const { MongoClient } = require("mongodb");
require("dotenv").config()
const url = process.env.MONGO_DB_URL
const client = new MongoClient(url);

client.connect()
  .then(() => {console.log('Connected to MongoDB' )})
  .catch(err => console.error('Error connecting to MongoDB:', err))

let  database = undefined;
try{
  database = client.db('moonshot');

}catch (err) {
  console.log(err)
}

module.exports = database