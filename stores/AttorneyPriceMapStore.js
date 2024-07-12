import { types, flow } from 'mobx-state-tree'
import AttorneyPrice from '@/stores/models/AttorneyPrice'

const AttorneyPriceMapStore = types
  .model('AttorneyPriceMapStore', {
    priceMap: types.array(AttorneyPrice), // Initialize attorneysPanel as an array of Attorney model
  })
  .views((self) => ({
    // Add views here
  }))
  .actions((self) => ({
    fetchPrices: flow(function* fetchPrices() {}),
    createPrice: flow(function* createPrice(data) {}),
    updatePrice: flow(function* updatePrice(data) {}),
    deletePrice: flow(function* deletePrice(data) {}),
    // Add more actions here
  }))

export default AttorneyPriceMapStore
