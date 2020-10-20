if (process.env.NODE_ENV === "development") {
   // console.log("Environment Development Detected!");
   const env = require('dotenv').config('../')
   // console.log(env.parsed);
}

const MongoClient = require('mongodb').MongoClient;
const DBuri = process.env.MONGODB_URI;
const client = new MongoClient(DBuri, { useNewUrlParser: true, useUnifiedTopology: true });

function connect_db() {
   return new Promise(async (resolve, reject) => {
      try {
         await client.connect();
         const database = client.db('billing-app-db');
         console.log('db connected');
         resolve(database)
      } catch (e) {
         console.log('db connection failed : ');
         console.log(e);
         reject(e)
      } finally {
         // await client.close();
      }
   })
}
// const collection = database.collection('admin');

// Query for a movie that has the title 'Back to the Future'
// const query = { title: 'Back to the Future' };
// const movie = await collection.findOne(query);

// console.log(movie);
// Ensures that the client will close when you finish/error
// run().catch(console.dir);

// client.connect(err => {
//    const collection = client.db("test").collection("devices");
//    // perform actions on the collection object
//    client.close();
// });

module.exports = { connect_db, client };