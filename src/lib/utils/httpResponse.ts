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
