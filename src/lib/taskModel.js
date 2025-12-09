import { connectDB } from "./db.js";
import { ObjectId } from "mongodb";

export async function getTasks(userId) {
  const db = await connectDB();
  return db
    .collection("tasks")
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();
}

export async function getTask(id, userId) {
  const db = await connectDB();
  return db.collection("tasks").findOne({ _id: new ObjectId(id), userId });
}

export async function createTask(task) {
  const db = await connectDB();
  task.createdAt = new Date();
  task.updatedAt = new Date();
  return db.collection("tasks").insertOne(task);
}

export async function updateTask(id, userId, update) {
  const db = await connectDB();
  update.updatedAt = new Date();
  return db
    .collection("tasks")
    .updateOne({ _id: new ObjectId(id), userId }, { $set: update });
}

export async function deleteTask(id, userId) {
  const db = await connectDB();
  return db.collection("tasks").deleteOne({ _id: new ObjectId(id), userId });
}
