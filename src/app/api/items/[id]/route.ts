import { NextRequest } from 'next/server'
import { SearchResultItemMockDTO } from '../../types/dto'
import { buildFallbackItem } from '../../utils/buildFallbackItem'
import { buildFullItemData } from '../../utils/buildFullItemData'
import { loadAllMockResults } from '../../utils/loadMocks'
import { findItemFiles } from '../../utils/findItemFiles'
import { loadJsonFile } from '../../utils/loadJsonFile'
import { mergeItemWithSearchData } from '../../utils/mergeItemWithSearchData'
import { errorResponse, successResponse } from '../../utils/apiResponses'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const allSearchResults = loadAllMockResults()
    const filePaths = findItemFiles(id)

    if (!filePaths) {
      const fallback = buildFallbackItem(id, allSearchResults)
      if (!fallback) return errorResponse('Item not found', 404)
      return successResponse(fallback)
    }

    const item = loadJsonFile(filePaths.itemPath)
    const description = loadJsonFile(filePaths.descPath)
    const category = loadJsonFile(filePaths.catPath)

    if (!item) {
      return errorResponse('Failed to load item data', 500)
    }

    const fromSearch = allSearchResults.find((r: SearchResultItemMockDTO) => r.id === id)

    const mergedItem = mergeItemWithSearchData(item, fromSearch)
    const result = buildFullItemData(mergedItem, description, category)

    return successResponse(result)
  } catch (error) {
    return errorResponse('Failed to load item', 500, error)
  }
}
