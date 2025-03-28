import { types } from 'mobx-state-tree'

const TrafficCounty = types.model('TrafficCounty', {
  _id: types.string,
  name: types.string,
  enabled: types.boolean,
  stateShortName:types.string,
  trafficState:types.optional(types.string,"")
});

export default TrafficCounty 