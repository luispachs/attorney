import { types } from 'mobx-state-tree'
import AttorneyStore from './AttorneyStore'
import AttorneyPriceStore from './AttorneyPriceStore'
import ReferenceStore from './ReferenceStore'

const RootStore = types
  .model('RootStore', {
    attorney: types.optional(AttorneyStore, {}),
    attorneyPrice: types.optional(AttorneyPriceStore, {
      items: [],
      loading: false,
      error: null,
      observers: []
    }),
    reference: types.optional(ReferenceStore, {
      courts: [],
      counties: [],
      violations: [],
      loading: false,
      error: null,
      observers: []
    })
  })
  .actions(self => ({
    async initialize() {
      try {
        await Promise.all([
          self.reference.fetchReferences(),
          self.attorney.fetchAttorneys()
        ])
      } catch (error) {
        console.error('Failed to initialize stores:', error)
      }
    }
  }))

export default RootStore 