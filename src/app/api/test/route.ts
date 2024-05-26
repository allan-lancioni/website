import { NextApiRequest } from 'next'

export async function GET(req: NextApiRequest) {
  try {
    if (process.env.NODE_ENV !== 'production') {
      console.log(process.env.OPENAI_API_KEY) // Log API key in non-production mode
    }
    return new Response(`Environment is configured`, { status: 200 })
  } catch (error) {
    return new Response(`Internal Server Error`, { status: 500 })
  }
}