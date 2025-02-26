import dbConnect from '@/lib/dbConnect'
import TrafficCourt from '@/models/TrafficCourt'

export default async function handler(req, res) {
  const { id } = req.query
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const court = await TrafficCourt.findById(id).populate('countyId')
        if (!court) {
          return res.status(404).json({ error: 'Traffic court not found' })
        }
        res.status(200).json(court)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch traffic court' })
      }
      break

    case 'PUT':
      try {
        const court = await TrafficCourt.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })
        if (!court) {
          return res.status(404).json({ error: 'Traffic court not found' })
        }
        res.status(200).json(court)
      } catch (error) {
        res.status(400).json({ error: 'Failed to update traffic court' })
      }
      break

    case 'DELETE':
      try {
        const court = await TrafficCourt.findByIdAndDelete(id)
        if (!court) {
          return res.status(404).json({ error: 'Traffic court not found' })
        }
        res.status(200).json({ message: 'Traffic court deleted successfully' })
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete traffic court' })
      }
      break

    default:
      res.status(405).json({ error: 'Method not allowed' })
  }
} 