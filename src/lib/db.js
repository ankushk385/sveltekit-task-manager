import { MONGO_URI } from "$env/static/private";
import { MongoClient } from "mongodb";

let client;
let db;

export async function connectDB() {
  if (!client) {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db();
    console.log("MongoDB connected");
  }
  return db;
}
