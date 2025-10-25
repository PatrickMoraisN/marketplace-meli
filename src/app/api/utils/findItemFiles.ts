import fs from 'fs'
import path from 'path'
import { MOCKS_BASE_PATH } from '../constants/paths'

export interface ItemFilePaths {
  itemPath: string
  descPath: string
  catPath: string
}

export function findItemFiles(id: string): ItemFilePaths | null {
  const categories = fs.readdirSync(MOCKS_BASE_PATH)

  for (const categoryFolder of categories) {
    const dirPath = path.join(MOCKS_BASE_PATH, categoryFolder)
    const itemFile = path.join(dirPath, `item-${id}.json`)
    const descFile = path.join(dirPath, `item-${id}-description.json`)
    const catFile = path.join(dirPath, `item-${id}-category.json`)

    if (fs.existsSync(itemFile)) {
      return {
        itemPath: itemFile,
        descPath: descFile,
        catPath: catFile,
      }
    }
  }

  return null
}
