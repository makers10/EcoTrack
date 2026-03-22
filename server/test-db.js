const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://EcoTrack:Qb99lmSkX80IaukX@ecotrack.3st8afr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
  } catch (err) {
    console.error("Connection failed:", err);
  } finally {
    await client.close();
  }
}
run();
