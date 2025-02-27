import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: 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, // Store in Vercel Environment Variables
});

export default async function handler(req, res) {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({ error: "Please provide a text parameter." });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo", // or "gpt-3.5-turbo"
      messages: [
        { role: "system", content: "You are a professional English to Japanese translator." },
        { role: "user", content: `Translate this into Japanese: ${text}` }
      ]
    });

    const translation = response.choices[0].message.content;
    res.status(200).json({ english: text, japanese: translation });
  } catch (error) {
    res.status(500).json({ error: "Translation failed", details: error.message });
  }
}
