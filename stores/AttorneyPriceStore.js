import { types, flow, t } from 'mobx-state-tree'
import { createCrudStore } from '@/factories/StoreFactory'
import { createBaseModel } from '@/factories/ModelFactory'
import axios from 'axios'
import TrafficCounty from './models/TrafficCounty'
import Violation from './models/Violation'
import TrafficCourt from './models/TrafficCourt'
import Attorney from './models/Attorney'

const PriceMap = createBaseModel('PriceMap', {
  id:types.optional(types.string,""),
  attorney: types.maybeNull(Attorney),
  price: types.number,
  court: types.maybeNull(TrafficCourt),
  county: types.maybeNull(TrafficCounty),
  violation: types.maybeNull(Violation),

  pointsRange: types.optional(types.model({
    min: types.maybeNull(types.number),
    max: types.maybeNull(types.number)
  },null), { min: null, max: null })
})

const transformMongoData = (data) => {
  let attorneyaux = data.attorney
  attorneyaux.id = data.attorney._id
  
  return {
    id: data._id,
    attorney: attorneyaux,
    price: data.price,
    court: data.court ,
    county: data.county,
    violation: data.violation || null,
    pointsRange: {
      min: data.pointsRange?.min || null,
      max: data.pointsRange?.max || null
    },

  }
}

const AttorneyPriceStore = createCrudStore('AttorneyPriceStore', PriceMap, '/api/attorney-prices')
  .views(self => ({
    getPriceMapForAttorney(attorneyId) {
      return self.items.filter(price =>{ 
    
        return price.attorney.id === attorneyId})
    }
  }))
  .actions(self => ({
    fetchPriceMap: flow(function* (attorneyId) {
      self.setLoading(true)
      try {
        const response = yield axios.get(`/api/attorney-prices/${attorneyId}`)
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

    createPrice:  async (data) =>{
      self.setLoading(true)
      try {
        
        const response =await  axios.post('/api/attorney-prices', data)
  
        const transformedData = transformMongoData(response.data)
        self.add(transformedData)
        self.setError(null)
        return transformedData
      } catch (error) {
        self.setError('Failed to create price')
        console.error(error)
        throw error
      } finally {
        self.setLoading(false)
      }
    },

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