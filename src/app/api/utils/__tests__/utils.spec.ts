import fs from 'fs'
import { describe, expect, it, vi } from 'vitest'
import { errorResponse, successResponse } from '../apiResponses'
import { buildFallbackItem } from '../buildFallbackItem'
import { buildFullItemData } from '../buildFullItemData'
import { loadJsonFile } from '../loadJsonFile'
import { mergeItemWithSearchData } from '../mergeItemWithSearchData'

vi.mock('fs')

describe('API Utils', () => {
  describe('loadJsonFile', () => {
    it('load and parse JSON file when it exists', () => {
      const mockData = { id: '123', name: 'Test' }
      vi.mocked(fs.existsSync).mockReturnValue(true)
      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockData))

      const result = loadJsonFile('/test/path.json')

      expect(result).toEqual(mockData)
      expect(fs.existsSync).toHaveBeenCalledWith('/test/path.json')
      expect(fs.readFileSync).toHaveBeenCalledWith('/test/path.json', 'utf-8')
    })

    it('return null when file does not exist', () => {
      vi.mocked(fs.existsSync).mockReturnValue(false)

      const result = loadJsonFile('/test/nonexistent.json')

      expect(result).toBeNull()
    })

    it('return null when JSON parsing fails', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true)
      vi.mocked(fs.readFileSync).mockReturnValue('invalid json')

      const result = loadJsonFile('/test/invalid.json')

      expect(result).toBeNull()
    })
  })

  describe('mergeItemWithSearchData', () => {
    it('return item unchanged when no search result provided', () => {
      const item = { id: '123', title: 'Test' }

      const result = mergeItemWithSearchData(item, undefined)

      expect(result).toEqual(item)
    })

    it('merge installments from search result', () => {
      const item = { id: '123', title: 'Test' }
      const searchResult = {
        id: '123',
        title: 'Test',
        installments: {
          quantity: 12,
          amount: 100,
          rate: 0,
          currency_id: 'BRL',
        },
      } as any

      const result = mergeItemWithSearchData(item, searchResult)

      expect(result.installments).toEqual({
        quantity: 12,
        amount: 100,
        rate: 0,
        currency_id: 'BRL',
      })
    })

    it('merge sold_quantity from search result', () => {
      const item = { id: '123', title: 'Test', sold_quantity: 0 }
      const searchResult = { id: '123', sold_quantity: 50 } as any

      const result = mergeItemWithSearchData(item, searchResult)

      expect(result.sold_quantity).toBe(50)
    })

    it('merge shipping data', () => {
      const item = { id: '123', shipping: { mode: 'me1' } }
      const searchResult = {
        id: '123',
        shipping: { free_shipping: true },
      } as any

      const result = mergeItemWithSearchData(item, searchResult)

      expect(result.shipping).toEqual({
        mode: 'me1',
        free_shipping: true,
      })
    })

    it('use search result price when available', () => {
      const item = { id: '123', price: 100 }
      const searchResult = { id: '123', price: 150 } as any

      const result = mergeItemWithSearchData(item, searchResult)

      expect(result.price).toBe(150)
    })

    it('set condition from search result if item has no condition', () => {
      const item = { id: '123' }
      const searchResult = { id: '123', condition: 'new' } as any

      const result = mergeItemWithSearchData(item, searchResult)

      expect(result.condition).toBe('new')
    })
  })

  describe('apiResponses', () => {
    it('create error response with correct status', () => {
      const response = errorResponse('Test error', 400)

      expect(response.status).toBe(400)
    })

    it('create success response', () => {
      const data = { test: 'data' }
      const response = successResponse(data)

      expect(response.status).toBe(200)
    })

    it('log error when error object is provided', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const error = new Error('Test error')

      errorResponse('Failed', 500, error)

      expect(consoleSpy).toHaveBeenCalledWith('[API ERROR] Failed', error)
      consoleSpy.mockRestore()
    })
  })

  describe('buildFallbackItem', () => {
    it('return null when allResults is empty', () => {
      const result = buildFallbackItem('123', [])

      expect(result).toBeNull()
    })

    it('return null when item is not found', () => {
      const allResults = [{ id: '456', title: 'Other' }]

      const result = buildFallbackItem('123', allResults)

      expect(result).toBeNull()
    })

    it('build fallback item from search result', () => {
      const allResults = [
        {
          id: '123',
          title: 'Test Product',
          currency_id: 'BRL',
          price: 100,
          condition: 'new',
          thumbnail: 'http://test.com/image.jpg',
          shipping: { free_shipping: true },
          sold_quantity: 10,
          installments: { quantity: 12, amount: 10, rate: 0 },
          attributes: [],
          category_path_from_root: [{ name: 'Eletrônicos' }],
        },
      ]

      const result = buildFallbackItem('123', allResults)

      expect(result).toEqual({
        item: {
          id: '123',
          title: 'Test Product',
          price: {
            currency: 'BRL',
            amount: 100,
            decimals: 0,
            regular_amount: null,
          },
          pictures: ['http://test.com/image.jpg'],
          condition: 'new',
          free_shipping: true,
          sold_quantity: 10,
          installments: '12x',
          installments_amount: 10,
          installments_rate: 0,
          description: 'Descrição não disponível.',
          attributes: [],
          category_path_from_root: ['Eletrônicos'],
        },
      })
    })
  })

  describe('buildFullItemData', () => {
    it('build full item data with all fields', () => {
      const item = {
        id: '123',
        title: 'Test Product',
        currency_id: 'BRL',
        price: 100,
        original_price: 150,
        condition: 'new',
        pictures: [{ secure_url: 'http://test.com/image.jpg' }],
        shipping: { free_shipping: true },
        initial_quantity: 10,
        installments: { quantity: 12, amount: 10, rate: 0 },
        attributes: [
          { id: 'BRAND', name: 'Marca', value_name: 'Samsung' },
          { id: 'MODEL', name: 'Modelo', value_name: 'Galaxy' },
        ],
      }

      const description = { plain_text: 'Product description' }
      const category = {
        path_from_root: [{ name: 'Eletrônicos' }, { name: 'Celulares' }],
      }

      const result = buildFullItemData(item, description, category)

      expect(result).toEqual({
        item: {
          id: '123',
          title: 'Test Product',
          price: {
            currency: 'BRL',
            amount: 100,
            decimals: 0,
            regular_amount: 150,
          },
          pictures: ['http://test.com/image.jpg'],
          condition: 'new',
          free_shipping: true,
          sold_quantity: 10,
          installments: '12x',
          installments_amount: 10,
          installments_rate: 0,
          description: 'Product description',
          attributes: [
            { id: 'BRAND', name: 'Marca', value_name: 'Samsung' },
            { id: 'MODEL', name: 'Modelo', value_name: 'Galaxy' },
          ],
          category_path_from_root: ['Eletrônicos', 'Celulares'],
        },
      })
    })

    it('should handle missing optional fields', () => {
      const item = {
        id: '123',
        title: 'Test',
        currency_id: 'BRL',
        price: 100,
        condition: 'new',
      }

      const result = buildFullItemData(item, null, null)

      expect(result.item.description).toBe('')
      expect(result.item.pictures).toEqual([])
      expect(result.item.attributes).toEqual([])
      expect(result.item.category_path_from_root).toEqual([])
    })
  })
})
