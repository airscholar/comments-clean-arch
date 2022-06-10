import makeCommentsDb from './comments-db';
import * as mongodb from 'mongodb';

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;
// console.log({ url, dbName });
const MongoClient = mongodb.MongoClient;
const client = new MongoClient(url, { useNewUrlParser: true });

export async function makeDb() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(dbName);
}

const commentsDb = makeCommentsDb({ makeDb });
export default commentsDb;
