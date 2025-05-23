export default async function handler(req, res) {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "No question provided." });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: question }],
        temperature: 0.7,
      }),
    });

    const result = await response.json();

    if (!result.choices || !result.choices[0]) {
      return res.status(500).json({ error: "No answer from OpenAI." });
    }

    const answer = result.choices[0].message.content;
    res.status(200).json({ answer });

  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "OpenAI request failed." });
  }
}
