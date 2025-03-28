import dbConnect from '@/lib/dbConnect'
import AttorneyPrice from '@/db-schemas/AttorneyPrice'

export default async function handler(req, res) {
  const { id } = req.query
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const price = await AttorneyPrice.findById(id)
          .populate('attorneyId')
          .populate('courtId')
          .populate('countyId')
          .populate('violationId')
        if (!price) {
          return res.status(404).json({ error: 'Price not found' })
        }
        res.status(200).json(price)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch price' })
      }
      break

    case 'PUT':
      try {
        const price = await AttorneyPrice.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })
        if (!price) {
          return res.status(404).json({ error: 'Price not found' })
        }
        res.status(200).json(price)
      } catch (error) {
        res.status(400).json({ error: 'Failed to update price' })
      }
      break

    case 'DELETE':
      try {
        const price = await AttorneyPrice.findByIdAndDelete(id)
        if (!price) {
          return res.status(404).json({ error: 'Price not found' })
        }
        res.status(200).json({ message: 'Price deleted successfully' })
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete price' })
      }
      break

    default:
      res.status(405).json({ error: 'Method not allowed' })
  }
} 