import { z } from "zod"

export function httpJSONResponse<T = any>(data: T, status: number = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function httpErrorMissingArgs(missingArgs?: string | string[]): Response {
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

export function httpInternalServerError(error?: string): Response {
  return httpJSONResponse(
    {
      message: 'Internal server error',
      error: error,
    },
    500
  )
}

export function httpError(error: (Error & { meta?: any }) | string, status: number = 400): Response {

  if (typeof error === 'string') {
    return httpJSONResponse({ error }, status)
  }

  if (error instanceof z.ZodError) {
    return httpJSONResponse({ message: 'Validation error', error: error.errors }, status)
  }

  if (error?.name.includes('RequestError') && error?.meta?.cause) {
    return httpJSONResponse({ error: error?.meta?.cause }, status)
  }

  return httpInternalServerError()
}