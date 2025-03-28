import { types, flow } from 'mobx-state-tree'
import TrafficCourt from './models/TrafficCourt'
import TrafficCounty from './models/TrafficCounty'
import Violation from './models/Violation'
import axios from 'axios'
import TrafficState from '@/stores/models/TrafficState'
import { POST } from '@/utils/http'

const ReferenceStore = types
  .model('ReferenceStore', {
    courts: types.array(TrafficCourt),
    counties: types.array(TrafficCounty),
    violations: types.array(Violation),
    loading: types.optional(types.boolean, false),
    error: types.maybeNull(types.string),
    states:types.array(TrafficState)
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
        const [courtsRes, countiesRes, violationsRes,statesRes] = yield Promise.all([
          axios.get('/api/traffic-courts'),
          axios.get('/api/traffic-counties'),
          axios.get('/api/violations'),
          axios.get('/api/states')
        ])
        
        self.courts = courtsRes.data
        self.counties = countiesRes.data
        self.violations = violationsRes.data
        self.states = statesRes.data
        self.setError(null)
      } catch (error) {
        self.setError('Failed to fetch reference data');
        console.error(error);
      } finally {
        self.setLoading(false);
      }
    }),

      createState:async (data)=>{
     
          let res = await POST("/states/create",data);
          return res.data;
      },
      addState(state){
        self.states.push(state);
      },
      addCounty(county){
        self.counties.push(county);
      },
      removeCounty(id){
          let aux = self.counties.filter(elem=>{
            return elem._id != id;
          })
  
          self.counties = aux;
          return self.counties;
      },

      updateCounty(id,county){
        
        let index  = self.counties.findIndex(elem=>elem._id == id);
        self.counties[index]= county;
        return self.counties[index];
      },
      addCourt(court){
        self.courts.push(court);
      },
      removeCourt(id){
          let aux = self.courts.filter(elem=>{
            return elem._id != id;
          })
  
          self.counties = aux;
          return self.courts;
      },
      updateCourt(id,court){
        let index  = self.courts.findIndex(elem=>elem._id == id);
        self.courts[index]= court;
        return self.courts[index];
      },
      addViolation(violation){
        self.violations.push(violation);
      },
      removeViolation(id){
        let aux = self.violations.filter(elem=>{
          return elem._id != id;
        })

        self.violations = aux;
        return self.violations;
      },
      updateViolation(id,violation){
        let index  = self.violations.findIndex(elem=>elem._id == id);
        self.violations[index]= violation;
        return self.violations[index];
      }

    }
  )
  ).views(self=>(
    {
      stateList(){
        return self.states;
      },
      countiesList(){
        return self.counties;
      },
      stateById(id){
        return self.states.find(elem=>{
          return elem._id ==id;
        })
      },
      countyById(id){
        return self.counties.find(elem => elem._id == id);
      },
      courtsList(){
        return self.courts;
      },
      courtById(id){
        return self.courts.find(elem => elem._id == id);
      },
      violationsList(){
        return self.violations;
      },
      violationById(id){
        return self.violations.find(elem => elem._id == id);
      }
    }
  ))

export default ReferenceStore 