import { z } from "zod"

export function httpJSONResponse(data: any, status: number = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function httpErrorMissingArgs(missingArgs?: string | string[]) {
  if (typeof missingArgs === 'string') {
    missingArgs = [missingArgs]
  }
  return httpJSONResponse(
    {
      error: 'Missing arguments',
      missingArgs: missingArgs || [],
    },
    400
  )
}

export function httpInternalServerError(error?: string) {
  return httpJSONResponse(
    {
      message: 'Internal server error',
      error: error,
    },
    500
  )
}

export function httpError(error: Error & { meta?: any }) {

  console.error(error)

  if (error instanceof z.ZodError) {
    return httpJSONResponse({ message: 'Validation error', error: error.errors }, 400)
  }

  if (error?.name.includes('RequestError') && error?.meta?.cause) {
    return httpJSONResponse({ error: error?.meta?.cause }, 400)
  }

  return httpInternalServerError()
}