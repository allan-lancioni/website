import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function fetchCompletion(prompt) {
  const response = await openai.chat.completions.create({
    messages: [{ role: 'system', content: prompt }],
    model: 'gpt-3.5-turbo',
  })
  console.log(response)
  return response
  // return response.choices[0].message
}
