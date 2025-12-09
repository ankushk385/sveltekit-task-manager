import { json } from "@sveltejs/kit";
import bcrypt from "bcryptjs";
import { signJwt } from "$lib/jwt";
import { connectDB } from "$lib/db";

export async function POST({ request }) {
  const { email, password } = await request.json();

  const db = await connectDB();
  const users = db.collection("users");

  const user = await users.findOne({ email });
  console.log("this ran", user);
  if (!user) return json({ error: "Invalid credentials" }, { status: 400 });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return json({ error: "Invalid credentials" }, { status: 400 });

  const token = signJwt({ id: user._id, email: user.email });

  return json({ token });
}
