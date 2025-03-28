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
      states:[],
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
    },

    async updateReferences(){
      try {
        await Promise.all([
          self.reference.fetchReferences(),
        ])
      } catch (error) {
        console.error('Failed to initialize stores:', error)
      }
    },
    createState:async (data)=>{
      return  await self.reference.createState(data);
    },
    addState(state){
      self.reference.addState(state);
    },
    addCounty(county){
      self.reference.addCounty(county)
    },
    removeCounty(id){
      return  self.reference.removeCounty(id);  
    },

    updateCounty(id,county){
      return self.reference.updateCounty(id,county)
    },
    addCourt(court){
      self.reference.addCourt(court)
    },
    removeCourt(id){
      return self.removeCourt(id);
    },
    updateCourt(id,court){
      return self.reference.updateCourt(id,court)
    },
    addViolation(violation){
      self.reference.addViolation(violation)
    },
    removeViolation(id){
     return self.reference.removeViolation(id)
    },
    updateViolation(id,violation){
      return self.reference.updateViolation(id,violation);
    },

  })).
  views(self =>(
    {
      stateList(){
        return self.reference.stateList();
      },
      countiesList(){
        return self.reference.countiesList();
      },
      stateById(id){
        return self.reference.stateById(id);
      },
      courtsList(){
        return self.reference.courtsList();
      },
      courtById(id){
        return self.reference.courtById(id);
      },
      violationsList(){
        return self.reference.violationsList();
      },
      violationById(id){
        return self.reference.violationById(id);
      },
      attorneyById(id){
       return  self.attorney.getById(id);
      }
    }
  ))

export default RootStore 