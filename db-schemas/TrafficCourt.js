import mongoose from 'mongoose'
import TrafficCounty from './TrafficCounty'

const TrafficCourtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  trafficCounty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: TrafficCounty.modelName,
    required: true,
  },
  enabled: {
    type: Boolean,
    alias:'state',
    default: true,
  },
})

export default mongoose.models.TrafficCourt ||  mongoose.model('TrafficCourt', TrafficCourtSchema)
