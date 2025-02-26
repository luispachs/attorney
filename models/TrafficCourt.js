import mongoose from 'mongoose'

const TrafficCourtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  countyId: { type: mongoose.Schema.Types.ObjectId, ref: 'TrafficCounty' }
}, {
  timestamps: true
})

export default mongoose.models.TrafficCourt || mongoose.model('TrafficCourt', TrafficCourtSchema) 