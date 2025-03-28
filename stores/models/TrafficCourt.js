import { types } from 'mobx-state-tree'
import TrafficCounty from './TrafficCounty'

const TrafficCourt = types.model('TrafficCourt', {
  _id: types.identifier,
  name: types.string,
  address: types.maybeNull(types.string),
  trafficCounty: types.optional(TrafficCounty,{_id:"",name:"",stateShortName:"",enabled:false,trafficState:""}),
  enabled:types.boolean
})

export default TrafficCourt 