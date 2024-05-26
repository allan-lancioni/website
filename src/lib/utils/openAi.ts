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
  // return response
  return response.choices[0].message
}

export async function createChatCompletion(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
) {
  const payload: any = [
    {
      role: 'system',
      content:
        'Este assistente é especializado em tecnologia e inteligência artificial, focado em responder perguntas sobre o perfil profissional de Allan, integração de IA, modelos de aprendizado de máquina e aplicações personalizadas de IA. Deve oferecer respostas curtas e formais, usando emojis para tornar a interação mais amigável 🤖. Respostas detalhadas devem ser fornecidas apenas quando explicitamente solicitadas pelo usuário. Em caso de dúvidas fora deste escopo, redirecione o usuário para fazer contato via email: allanlancioni@allanlancioni.com. Mantenha-se focado em tecnologia e no perfil profissional de Allan, solicitando mais informações ou esclarecimentos sempre que necessário. Se a resposta não estiver clara ou o tópico for muito complexo, peça ao usuário que entre em contato via email 📧.',
    },
    ...messages,
  ]

  console.log({payload})

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: payload,
    })
    return response
  } catch (error) {
    console.error('Failed to create chat completion:', error)
    throw error // Rethrowing the error to be handled by the API route.
  }
}
