import { types } from 'mobx-state-tree'
import { createCrudStore } from '@/factories/StoreFactory'
import axios from 'axios'

jest.mock('axios')

describe('StoreFactory', () => {
  const TestModel = types.model('TestModel', {
    id: types.identifier,
    name: types.string
  })

  let store

  beforeEach(() => {
    store = createCrudStore('TestStore', TestModel, '/api/test').create({
      items: [],
      observers: []
    })
  })

  it('should create a store with basic CRUD operations', () => {
    expect(store.items).toBeDefined()
    expect(store.loading).toBeDefined()
    expect(store.error).toBeDefined()
    expect(typeof store.fetch).toBe('function')
    expect(typeof store.create).toBe('function')
    expect(typeof store.update).toBe('function')
  })

  it('should handle observers', () => {
    store.addObserver('test-1')
    expect(store.observers).toContain('test-1')

    store.removeObserver('test-1')
    expect(store.observers).not.toContain('test-1')
  })

  it('should fetch items and notify observers', async () => {
    const mockData = [{ id: '1', name: 'Test' }]
    axios.get.mockResolvedValueOnce({ data: mockData })

    const observerId = 'test-1'
    store.addObserver(observerId)

    await store.fetch()

    expect(store.items.length).toBe(1)
    expect(store.items[0].name).toBe('Test')
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })
}) 