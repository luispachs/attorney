import { getSnapshot } from 'mobx-state-tree'
import AttorneyStore from '@/stores/AttorneyStore'
import axios from 'axios'

jest.mock('axios')

describe('AttorneyStore', () => {
  let store

  beforeEach(() => {
    store = AttorneyStore.create({
      items: [],
      loading: false,
      error: null,
      observers: []
    })
  })

  it('should fetch attorneys', async () => {
    const mockAttorneys = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' }
    ]

    axios.get.mockResolvedValueOnce({ data: mockAttorneys })

    await store.fetchAttorneys()

    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
    expect(getSnapshot(store.items)).toEqual(mockAttorneys)
  })

  it('should handle fetch error', async () => {
    const error = new Error('Network error')
    axios.get.mockRejectedValueOnce(error)

    await store.fetchAttorneys()

    expect(store.loading).toBe(false)
    expect(store.error).toBe('Failed to fetch attorneys')
    expect(store.items.length).toBe(0)
  })

  it('should create attorney', async () => {
    const newAttorney = { name: 'New Attorney', email: 'new@example.com' }
    const createdAttorney = { id: '3', ...newAttorney }

    axios.post.mockResolvedValueOnce({ data: createdAttorney })

    await store.createAttorney(newAttorney)

    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
    expect(store.items.length).toBe(1)
    expect(getSnapshot(store.items[0])).toEqual(createdAttorney)
  })

  it('should update attorney', async () => {
    const attorney = { 
      id: '1', 
      name: 'John Doe', 
      email: 'john@example.com',
      isActive: true 
    }
    const updatedData = { 
      name: 'John Updated', 
      email: 'john.updated@example.com' 
    }

    store.items.push(attorney)
    axios.put.mockResolvedValueOnce({ 
      data: { ...attorney, ...updatedData } 
    })

    await store.updateAttorney('1', updatedData)

    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
    expect(getSnapshot(store.items[0])).toEqual({
      ...attorney,
      ...updatedData
    })
  })

  it('should toggle attorney status', async () => {
    const attorney = { 
      id: '1', 
      name: 'John Doe', 
      isActive: true 
    }

    store.items.push(attorney)
    axios.put.mockResolvedValueOnce({ 
      data: { ...attorney, isActive: false } 
    })

    await store.disableAttorney('1')

    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
    expect(store.items[0].isActive).toBe(false)
  })

  it('should handle update error', async () => {
    const error = new Error('Network error')
    axios.put.mockRejectedValueOnce(error)

    try {
      await store.updateAttorney('1', {})
      fail('Should have thrown an error')
    } catch (e) {
      expect(store.loading).toBe(false)
      expect(store.error).toBe('Failed to update attorney')
    }
  })

  it('should notify observers on data changes', async () => {
    const mockData = [{ id: '1', name: 'Test Attorney' }]
    axios.get.mockResolvedValueOnce({ data: mockData })

    const observerId = 'test-observer'
    store.addObserver(observerId)
    
    await store.fetchAttorneys()

    expect(store.observers).toContain(observerId)
  })
}) 