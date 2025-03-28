import dbConnect from '@/lib/dbConnect'
import Attorney from '@/db-schemas/Attorney'

export default async function handler(req, res) {
  const { id } = req.query
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const attorney = await Attorney.findById(id)
        if (!attorney) {
          return res.status(404).json({ error: 'Attorney not found' })
        }
        res.status(200).json(attorney)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch attorney' })
      }
      break

    case 'PUT':
      try {
        const attorney = await Attorney.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })
        if (!attorney) {
          return res.status(404).json({ error: 'Attorney not found' })
        }
        res.status(200).json(attorney)
      } catch (error) {
        res.status(400).json({ error: 'Failed to update attorney' })
      }
      break

    case 'DELETE':
      try {
        const attorney = await Attorney.findByIdAndDelete(id)
        if (!attorney) {
          return res.status(404).json({ error: 'Attorney not found' })
        }
        res.status(200).json({ message: 'Attorney deleted successfully' })
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete attorney' })
      }
      break

    default:
      res.status(405).json({ error: 'Method not allowed' })
  }
} 