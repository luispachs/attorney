import { types, flow } from 'mobx-state-tree'
import TrafficCourt from './models/TrafficCourt'
import TrafficCounty from './models/TrafficCounty'
import Violation from './models/Violation'
import axios from 'axios'

const ReferenceStore = types
  .model('ReferenceStore', {
    courts: types.array(TrafficCourt),
    counties: types.array(TrafficCounty),
    violations: types.array(Violation),
    loading: types.optional(types.boolean, false),
    error: types.maybeNull(types.string)
  })
  .actions(self => ({
    setLoading(state) {
      self.loading = state
    },
    setError(error) {
      self.error = error
    },
    fetchReferences: flow(function* fetchReferences() {
      self.setLoading(true)
      try {
        const [courtsRes, countiesRes, violationsRes] = yield Promise.all([
          axios.get('/api/traffic-courts'),
          axios.get('/api/traffic-counties'),
          axios.get('/api/violations')
        ])
        
        self.courts = courtsRes.data
        self.counties = countiesRes.data
        self.violations = violationsRes.data
        self.setError(null)
      } catch (error) {
        self.setError('Failed to fetch reference data')
        console.error(error)
      } finally {
        self.setLoading(false)
      }
    })
  }))

export default ReferenceStore 