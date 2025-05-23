export default async function handler(req, res) {
  const { question } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: question }],
    }),
  });

  const result = await response.json();
  const answer = result.choices?.[0]?.message?.content || "No answer.";
  res.status(200).json({ answer });
}
