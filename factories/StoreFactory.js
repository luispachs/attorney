import { types, flow } from 'mobx-state-tree'
import axios from 'axios'

const createBaseStore = (name, Model, endpoint) => {
  return types
    .model(name, {
      items: types.array(Model),
      loading: types.optional(types.boolean, false),
      error: types.maybeNull(types.string),
      observers: types.array(types.string)
    })
    .views(self => ({
      get hasError() {
        return !!self.error
      }
    }))
    .actions(self => ({
      setLoading(state) {
        self.loading = state
      },
      setError(error) {
        self.error = error
      },
      addObserver(id) {
        if (!self.observers.includes(id)) {
          self.observers.push(id)
        }
      },
      removeObserver(id) {
        const index = self.observers.indexOf(id)
        if (index !== -1) {
          self.observers.splice(index, 1)
        }
      },
      notifyObservers() {
        self.observers.forEach(id => {
          // Notify observers through a callback or event system
        })
      },
      fetch: flow(function* fetch() {
        self.setLoading(true)
        try {
          const response = yield axios.get(endpoint)
          self.items = response.data
          self.setError(null)
          self.notifyObservers()
        } catch (error) {
          self.setError(`Failed to fetch ${name}`)
          console.error(error)
        } finally {
          self.setLoading(false)
        }
      })
    }))
}

export const createCrudStore = (name, Model, endpoint) => {
  return types.compose(
    createBaseStore(name, Model, endpoint),
    types.model({})
      .actions(self => ({
        create: flow(function* create(data) {
          self.setLoading(true)
          try {
            const response = yield axios.post(endpoint, data)
            self.items.push(response.data)
            self.setError(null)
            self.notifyObservers()
            return response.data
          } catch (error) {
            self.setError(`Failed to create ${name}`)
            throw error
          } finally {
            self.setLoading(false)
          }
        }),
        update: flow(function* update(id, data) {
          self.setLoading(true)
          try {
            const response = yield axios.put(`${endpoint}/${id}`, data)
            const index = self.items.findIndex(item => item.id === id)
            if (index !== -1) {
              self.items[index] = response.data
            }
            self.setError(null)
            self.notifyObservers()
            return response.data
          } catch (error) {
            self.setError(`Failed to update ${name}`)
            throw error
          } finally {
            self.setLoading(false)
          }
        })
      }))
  )
} 