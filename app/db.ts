import { MongoClient } from 'mongodb';

if (!process.env.MONGO_URL) {
  throw new Error('MONGO_URL is missing.');
}

const client = new MongoClient(process.env.MONGO_URL);

export const db = client.db('interview');
