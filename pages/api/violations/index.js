import dbConnect from '@/lib/dbConnect'
import Violation from '@/db-schemas/Violation'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const violations = await Violation.find({})
        res.status(200).json(violations)
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch violations' })
      }
      break

    case 'POST':
      try {
        const violation = await Violation.create(req.body)
        console.log(violation)
        res.status(201).json({message:"",data:{violation}})
      } catch (error) {
        
        res.status(400).json({ error: 'Failed to create violation' })
      }
      break

    default:
      res.status(405).json({ error: 'Method not allowed' })
  }
} 