import { NextRequest, NextResponse } from 'next/server'
import { loadAllMockResults } from '../utils/loadMocks'
import { transformSearchResponse } from '../utils/transformSearchResponse'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')
  const offset = Number(searchParams.get('offset') || 0)

  if (!query) {
    return NextResponse.json({ error: 'Missing search query' }, { status: 400 })
  }

  try {
    const allResults = loadAllMockResults()
    const transformed = transformSearchResponse(allResults, query, offset)
    return NextResponse.json({ data: transformed })
  } catch (error) {
    console.error('[MOCK SEARCH ERROR]', error)
    return NextResponse.json({ error: 'Failed to process mock search' }, { status: 500 })
  }
}
