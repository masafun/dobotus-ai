export default async function handler(req, res) {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "質問が空です" });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o", // ✅ モデル名確認
        messages: [{ role: "user", content: question }],
        temperature: 0.7,
      }),
    });

    const result = await response.json();
    
	console.log("API Key:", process.env.OPENAI_API_KEY?.slice(0, 8)); // 安全確認
	console.log("OpenAI Response:", JSON.stringify(result));
	
    if (!result.choices || !result.choices[0]?.message?.content) {
      return res.status(500).json({ error: "OpenAIからの回答が取得できませんでした。" });
    }

    const answer = result.choices[0].message.content;
    res.status(200).json({ answer });

  } catch (error) {
    console.error("OpenAI ERROR:", error);
    res.status(500).json({ error: "OpenAI接続エラー" });
  }
}
