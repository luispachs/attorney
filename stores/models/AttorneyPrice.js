import { types } from 'mobx-state-tree'

const PointsRange = types.model('PointsRange', {
  min: types.optional(types.number, 0),
  max: types.optional(types.number, 0)
})

const PriceEntry = types
  .model('PriceEntry', {
    id: types.optional(types.string, ''),
    courtId: types.maybe(types.string),
    countyId: types.maybe(types.string),
    violationId: types.maybe(types.string),
    pointsRange: types.maybe(PointsRange),
    price: types.number,
  })
  .views(self => ({
    get displayRange() {
      return self.pointsRange ? `${self.pointsRange.min}-${self.pointsRange.max} points` : 'All points'
    }
  }))

const AttorneyPrice = types
  .model('AttorneyPrice', {
    attorneyId: types.string,
    prices: types.array(PriceEntry)
  })
  .actions(self => ({
    addPrice(price) {
      self.prices.push(price)
    },
    removePrice(priceId) {
      const index = self.prices.findIndex(p => p.id === priceId)
      if (index !== -1) {
        self.prices.splice(index, 1)
      }
    },
    updatePrice(priceId, data) {
      const price = self.prices.find(p => p.id === priceId)
      if (price) {
        Object.assign(price, data)
      }
    }
  }))

export default AttorneyPrice
