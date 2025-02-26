import mongoose from 'mongoose'

const ViolationSchema = new mongoose.Schema({
  code: { type: String, required: true },
  description: { type: String, required: true },
  defaultPoints: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export default mongoose.models.Violation || mongoose.model('Violation', ViolationSchema) 