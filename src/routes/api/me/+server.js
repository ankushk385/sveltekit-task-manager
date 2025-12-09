import { json } from "@sveltejs/kit";
import { verifyJwt } from "$lib/jwt";
import { connectDB } from "$lib/db";
import { ObjectId } from "mongodb";

export async function POST({ request }) {
  const { token } = await request.json();

  const data = verifyJwt(token);
  if (!data) return json({ error: "Invalid token" }, { status: 401 });

  const db = await connectDB();
  const users = db.collection("users");

  const user = await users.findOne({ _id: new ObjectId(data.id) });

  return json({ username: user.username, email: user.email });
}
