import fs from 'fs'
import path from 'path'

export function loadAllMockResults(): any[] {
  const mocksBasePath = path.join(process.cwd(), 'src/app/api/mocks')

  const categories = fs.readdirSync(mocksBasePath)
  let allResults: any[] = []

  for (const category of categories) {
    const mockFilePath = path.join(mocksBasePath, category, `search-MLA-${category}.json`)

    if (fs.existsSync(mockFilePath)) {
      const fileContent = fs.readFileSync(mockFilePath, 'utf-8')
      const mockData = JSON.parse(fileContent)
      const items = mockData.results || []
      allResults = allResults.concat(items)
    }
  }

  return allResults
}
