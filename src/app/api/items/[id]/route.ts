import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { buildFallbackItem } from '../../utils/buildFallbackItem'
import { buildFullItemData } from '../../utils/buildFullItemData'
import { loadAllMockResults } from '../../utils/loadMocks'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params

  try {
    const mocksDir = path.join(process.cwd(), 'src', 'app', 'api', 'mocks')
    const categories = fs.readdirSync(mocksDir)

    let itemPath = ''
    let descPath = ''
    let catPath = ''

    for (const categoryFolder of categories) {
      const dirPath = path.join(mocksDir, categoryFolder)
      const itemFile = path.join(dirPath, `item-${id}.json`)
      const descFile = path.join(dirPath, `item-${id}-description.json`)
      const catFile = path.join(dirPath, `item-${id}-category.json`)

      if (fs.existsSync(itemFile)) {
        itemPath = itemFile
        descPath = descFile
        catPath = catFile
        break
      }
    }

    if (!itemPath) {
      const fallback = buildFallbackItem(id)
      if (!fallback) return NextResponse.json({ error: 'Item not found' }, { status: 404 })
      return NextResponse.json(fallback)
    }

    const item = JSON.parse(fs.readFileSync(itemPath, 'utf-8'))
    const description = fs.existsSync(descPath)
      ? JSON.parse(fs.readFileSync(descPath, 'utf-8'))
      : null
    const category = fs.existsSync(catPath) ? JSON.parse(fs.readFileSync(catPath, 'utf-8')) : null

    const allSearchResults = loadAllMockResults()
    const fromSearch = allSearchResults.find((r: any) => r.id === id)

    if (fromSearch) {
      const searchInstallments = fromSearch.installments

      if (searchInstallments && typeof searchInstallments === 'object') {
        item.installments = {
          quantity: searchInstallments.quantity ?? 0,
          amount: searchInstallments.amount ?? 0,
          rate: searchInstallments.rate ?? 0,
          currency_id: searchInstallments.currency_id ?? 'ARS',
        }
      }

      item.sold_quantity = fromSearch.sold_quantity ?? item.sold_quantity ?? 0

      item.shipping = {
        ...(item.shipping || {}),
        ...(fromSearch.shipping || {}),
      }

      item.original_price = item.original_price ?? fromSearch.original_price ?? item.price

      if (fromSearch.price) {
        item.price = fromSearch.price
      }
      if (!item.condition && fromSearch.condition) {
        item.condition = fromSearch.condition
      }
    }

    const result = buildFullItemData(item, description, category)
    return NextResponse.json(result)
  } catch (error) {
    console.error('[MOCK ITEM ERROR]', error)
    return NextResponse.json({ error: 'Failed to load item' }, { status: 500 })
  }
}
