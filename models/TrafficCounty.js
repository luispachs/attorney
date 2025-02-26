import mongoose from 'mongoose'

const TrafficCountySchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export default mongoose.models.TrafficCounty || mongoose.model('TrafficCounty', TrafficCountySchema) 