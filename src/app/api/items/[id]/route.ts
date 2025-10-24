import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { buildFallbackItem } from '../../utils/buildFallbackItem'
import { buildFullItemData } from '../../utils/buildFullItemData'

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

    const result = buildFullItemData(item, description, category)
    return NextResponse.json(result)
  } catch (error) {
    console.error('[MOCK ITEM ERROR]', error)
    return NextResponse.json({ error: 'Failed to load item' }, { status: 500 })
  }
}
