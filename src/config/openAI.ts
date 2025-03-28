import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  // defaultHeaders: {
  //   "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
  //   "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
  // },
});

export async function generateLLMResponse({
  functionalityPrompt,
  userInput,
  model = "deepseek/deepseek-r1:free",
}) {
  const response = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: functionalityPrompt,
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: userInput,
          },
        ],
      },
    ],
    response_format: {
      type: "text",
    },
  });

  return response.choices[0].message;
}
