import { createChatCompletion } from '@/lib/utils/openAi'
import { httpJSONResponse, httpErrorMissingArgs, httpInternalServerError } from '@/lib/utils/httpResponse'

export async function POST(req: Request) {
  const { messages } = await req.json()
  if (!messages) { return httpErrorMissingArgs('messages') } // Implement validation for messages
  try {
    const response = await createChatCompletion(messages)
    return httpJSONResponse(response.choices[0].message)
  } catch (error) {
    return httpInternalServerError(error.message)
  }
}
