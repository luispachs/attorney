import mongoose from 'mongoose'
import Attorney from './Attorney'
import TrafficCourt from './TrafficCourt'
import TrafficCounty from './TrafficCounty'
import Violation from './Violation'

const AttorneyPriceMapSchema = new mongoose.Schema({
  attorney: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Attorney.modelName,
    required: true,
  },
  court: {
    type: mongoose.Schema.Types.ObjectId,
    ref: TrafficCourt.modelName,
  },
  county: {
    type: mongoose.Schema.Types.ObjectId,
    ref: TrafficCounty.modelName,
  },
  violation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Violation.modelName,
  },
  pointsRange: {
    type: mongoose.Schema.Types.Map,
    required: true,
    of:mongoose.Schema.Types.Int32
  },
  price: {
    type: Number,
    required: true,
  },
})

export default mongoose.models.AttorneyPriceMap ||  mongoose.model('AttorneyPriceMap', AttorneyPriceMapSchema)
