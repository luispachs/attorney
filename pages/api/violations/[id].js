import dbConnect from '@/lib/dbConnect'
import Violation from '@/db-schemas/Violation'

export default async function handler(req, res) {
  const { id } = req.query
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const violation = await Violation.findById(id)
        if (!violation) {
          return res.status(404).json({ error: 'Violation not found' })
        }
        res.status(200).json(violation)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch violation' })
      }
      break

    case 'PUT':
      try {
        const violation = await Violation.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })
        if (!violation) {
          return res.status(404).json({ error: 'Violation not found' })
        }
         
        res.status(200).json({message:"Update Successfull",data:{violation}})
      } catch (error) {
        res.status(400).json({ error: 'Failed to update violation' })
      }
      break

    case 'DELETE':
      try {
        const violation = await Violation.findByIdAndDelete(id)
        if (!violation) {
          return res.status(404).json({ error: 'Violation not found',data:{id}})
        }
        res.status(200).json({ message: 'Violation deleted successfully' ,data:{id}})
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete violation' })
      }
      break

    default:
      res.status(405).json({ error: 'Method not allowed' })
  }
} 