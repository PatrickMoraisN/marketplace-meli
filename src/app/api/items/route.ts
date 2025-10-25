import { NextRequest } from 'next/server'
import { loadAllMockResults } from '../utils/loadMocks'
import { transformSearchResponse } from '../utils/transformSearchResponse'
import { errorResponse, successResponse } from '../utils/apiResponses'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')
  const offset = Number(searchParams.get('offset') || 0)

  if (!query) {
    return errorResponse('Missing search query', 400)
  }

  try {
    const allResults = loadAllMockResults()
    const transformed = transformSearchResponse(allResults, query, offset)
    return successResponse({ data: transformed })
  } catch (error) {
    return errorResponse('Failed to process mock search', 500, error)
  }
}
