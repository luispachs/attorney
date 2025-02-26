import mongoose from 'mongoose'

const AttorneyPriceSchema = new mongoose.Schema({
  attorneyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Attorney', required: true },
  courtId: { type: mongoose.Schema.Types.ObjectId, ref: 'TrafficCourt' },
  countyId: { type: mongoose.Schema.Types.ObjectId, ref: 'TrafficCounty' },
  violationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Violation' },
  pointsRange: {
    min: { type: Number },
    max: { type: Number }
  },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export default mongoose.models.AttorneyPrice || mongoose.model('AttorneyPrice', AttorneyPriceSchema) 