import { json } from "@sveltejs/kit";
import bcrypt from "bcryptjs";
import { connectDB } from "$lib/db";

export async function POST({ request }) {
  const { username, email, password } = await request.json();

  const db = await connectDB();
  const users = db.collection("users");

  const exists = await users.findOne({ email });
  if (exists) return json({ error: "User exists" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);

  await users.insertOne({ username, email, password: hashed });

  return json({ success: true });
}
