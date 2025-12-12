import { json } from "@sveltejs/kit";
import { GROQ_API_KEY } from "$env/static/private";
export async function POST({ request }) {
  const { rawInput } = await request.json();

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `You are a task summarization assistant.  
Turn the following natural language into a JSON containing a title and description.  
Return only valid JSON.

Input: "${rawInput}"

Example output:
{
  "title": "...",
  "description": "..."
}`,
        },
      ],
    }),
  });

  const data = await res.json();
  if (data.error) {
    console.error("AI Error:", data.error);
    return json({ error: "AI generation failed" }, { status: 500 });
  }

  let text = data.choices?.[0]?.message?.content || "{}";

  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  let output;
  try {
    output = JSON.parse(text);
  } catch (e) {
    console.error("JSON parse error:", e, text);
    return json({ error: "Invalid JSON from AI" }, { status: 500 });
  }

  return json(output);
}
