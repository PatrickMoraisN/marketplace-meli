import fs from 'fs'

export function loadJsonFile<T = any>(filePath: string): T | null {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8')
      return JSON.parse(data) as T
    }
    return null
  } catch {
    return null
  }
}
