import { createChatCompletion } from '@/lib/utils/OpenAi'
import { httpJSONResponse, httpErrorMissingArgs } from '@/lib/utils/httpResponse'

export async function POST(req: Request) {
  const { messages } = await req.json()
  if (!messages) { return httpErrorMissingArgs('messages') } // Implement validation for messages
  try {
    const response = await createChatCompletion(messages)
    console.log(response.choices[0])
    return httpJSONResponse(response.choices[0].message)
  } catch (error) {
    return httpJSONResponse({
      message: 'Internal server error',
      error: error.message,
    }, 500)
  }
}
