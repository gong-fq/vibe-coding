export async function handler(event) {
  const { message } = JSON.parse(event.body);

  const r = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "你是 Vibe Coding 培训助教，解释清晰、务实。" },
        { role: "user", content: message }
      ]
    })
  });

  const data = await r.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      reply: data.choices?.[0]?.message?.content || "暂无回复"
    })
  };
}
