import { types, flow } from 'mobx-state-tree'
import { createCrudStore } from '@/factories/StoreFactory'
import { createBaseModel } from '@/factories/ModelFactory'
import axios from 'axios'

const Attorney = createBaseModel('Attorney', {
  name: types.string,
  email: types.string,
  phone: types.maybeNull(types.string),
  address: types.maybeNull(types.string),
  isActive: types.optional(types.boolean, true),
  createdAt: types.optional(types.string, ""),
  updatedAt: types.optional(types.string, ""),
  
})

// Fonction utilitaire pour transformer les données MongoDB
const transformMongoData = (data) => {
  return {
    id: data._id, // Utiliser _id de MongoDB comme id
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    address: data.address || null,
    isActive: data.isActive,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

const AttorneyStore = createCrudStore('AttorneyStore', Attorney, '/api/attorneys')
  .views((self) => ({
      getById(id){

        return self.items.find(elem => elem.id ==id)
      }
  }))
  .actions((self) => ({
    setLoading(state) {
      self.loading = state
    },
    setError(error) {
      self.error = error
    },
    fetchAttorneys: flow(function* fetchAttorneys() {
      self.setLoading(true)
      try {
        const response = yield axios.get('/api/attorneys')
        // Transformer les données avant de les assigner
        self.items = response.data.map(transformMongoData)
        self.setError(null)
      } catch (error) {
        self.setError('Failed to fetch attorneys')
        console.error(error)
      } finally {
        self.setLoading(false)
      }
    }),
    createAttorney: flow(function* createAttorney(data) {
      self.setLoading(true)
      try {
        const response = yield axios.post('/api/attorneys', data)
        // Transformer les données avant de les ajouter
        const transformedData = transformMongoData(response.data)
        self.items.push(transformedData)
        self.setError(null)
        return transformedData
      } catch (error) {
        self.setError('Failed to create attorney')
        console.error(error)
        throw error
      } finally {
        self.setLoading(false)
      }
    }),
    updateAttorney: flow(function* updateAttorney(id, data) {
      self.setLoading(true)
      try {
        const response = yield axios.put(`/api/attorneys/${id}`, data)
        // Transformer les données avant de les mettre à jour
        const transformedData = transformMongoData(response.data)
        const index = self.items.findIndex(attorney => attorney.id === id)
        if (index !== -1) {
          self.items[index] = transformedData
        }
        self.setError(null)
        return transformedData
      } catch (error) {
        self.setError('Failed to update attorney')
        console.error(error)
        throw error
      } finally {
        self.setLoading(false)
      }
    }),
    disableAttorney: function* (id) {
      const attorney = self.items.find(a => a.id === id)
      if (!attorney) throw new Error('Attorney not found')
      
      return yield self.updateAttorney(id, {
        isActive: !attorney.isActive
      })
    },
    // Add more actions here
  }))

export default AttorneyStore
