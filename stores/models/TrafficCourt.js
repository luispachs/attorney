import { types } from 'mobx-state-tree'

const TrafficCourt = types.model('TrafficCourt', {
  id: types.identifier,
  name: types.string,
  address: types.maybeNull(types.string),
  countyId: types.reference(types.late(() => require('./TrafficCounty').default))
})

export default TrafficCourt 