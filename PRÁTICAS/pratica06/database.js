import { MongoClient } from "mongodb";

const url = "" ;
const client = new MongoClient(url);

export async function conectarDb() {
  await client.connect();
  return client.db("agenda");
}