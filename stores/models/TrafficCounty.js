import { types } from 'mobx-state-tree'

const TrafficCounty = types.model('TrafficCounty', {
  id: types.identifier,
  name: types.string,
  state: types.string
})

export default TrafficCounty 