import mongoose from 'mongoose'

const ViolationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code:{
    type:String,
    required:true,
    unique:true
  },
  description:{
    type:String,
    required:true
  },
})

export default mongoose.models.Violation || mongoose.model('Violation', ViolationSchema)
