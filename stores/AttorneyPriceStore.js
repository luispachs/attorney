import { types, flow } from 'mobx-state-tree'
import { createCrudStore } from '@/factories/StoreFactory'
import { createBaseModel } from '@/factories/ModelFactory'
import axios from 'axios'

const PriceMap = createBaseModel('PriceMap', {
  attorneyId: types.string,
  price: types.number,
  courtId: types.maybeNull(types.string),
  countyId: types.maybeNull(types.string),
  violationId: types.maybeNull(types.string),
  pointsRange: types.optional(types.model({
    min: types.maybeNull(types.number),
    max: types.maybeNull(types.number)
  }), { min: null, max: null })
})

const transformMongoData = (data) => {
  return {
    id: data._id,
    attorneyId: data.attorneyId,
    price: data.price,
    courtId: data.courtId || null,
    countyId: data.countyId || null,
    violationId: data.violationId || null,
    pointsRange: {
      min: data.pointsRange?.min || null,
      max: data.pointsRange?.max || null
    },
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt)
  }
}

const AttorneyPriceStore = createCrudStore('AttorneyPriceStore', PriceMap, '/api/attorney-prices')
  .views(self => ({
    getPriceMapForAttorney(attorneyId) {
      return self.items.filter(price => price.attorneyId === attorneyId)
    }
  }))
  .actions(self => ({
    fetchPriceMap: flow(function* (attorneyId) {
      self.setLoading(true)
      try {
        const response = yield axios.get(`/api/attorney-prices?attorneyId=${attorneyId}`)
        // Remplacer uniquement les prix pour cet avocat
        const newPrices = response.data.map(transformMongoData)
        const otherPrices = self.items.filter(price => price.attorneyId !== attorneyId)
        self.items = [...otherPrices, ...newPrices]
        self.setError(null)
      } catch (error) {
        self.setError('Failed to fetch price map')
        console.error(error)
      } finally {
        self.setLoading(false)
      }
    }),

    createPrice: flow(function* (data) {
      self.setLoading(true)
      try {
        const response = yield axios.post('/api/attorney-prices', data)
        const transformedData = transformMongoData(response.data)
        self.items.push(transformedData)
        self.setError(null)
        return transformedData
      } catch (error) {
        self.setError('Failed to create price')
        console.error(error)
        throw error
      } finally {
        self.setLoading(false)
      }
    }),

    deletePrice: flow(function* (priceId) {
      self.setLoading(true)
      try {
        yield axios.delete(`/api/attorney-prices/${priceId}`)
        self.items = self.items.filter(price => price.id !== priceId)
        self.setError(null)
      } catch (error) {
        self.setError('Failed to delete price')
        console.error(error)
        throw error
      } finally {
        self.setLoading(false)
      }
    })
  }))

export default AttorneyPriceStore 