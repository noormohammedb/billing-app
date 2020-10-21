const { connect_db, client } = require('./db_connection')

function adminLogin(sQuery) {
   return new Promise(async (resolve, reject) => {
      try {
         let db = await connect_db()
         let data = await db.collection('admin').find({ email: sQuery.email }).toArray();
         // console.log(data);
         resolve(data)
      } catch (e) {
         console.error(e);
         console.log('error in adminLogin');
         reject(e)
      } finally {
         // await client.close();
      }
   })
}

async function pushUserData(data) {
   let db = await connect_db();
   let pushResult = 'jk';
   return await db.collection('users').insertOne(data)
}

async function getUserData() {
   let db = await connect_db();
   let data = await db.collection('users').find().toArray();
   console.log(data);
   return data;
   // connect_db().then(console.log)
}

module.exports = { adminLogin, pushUserData, getUserData }