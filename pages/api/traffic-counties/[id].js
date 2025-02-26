import dbConnect from '@/lib/dbConnect'
import TrafficCounty from '@/models/TrafficCounty'

export default async function handler(req, res) {
  const { id } = req.query
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const county = await TrafficCounty.findById(id)
        if (!county) {
          return res.status(404).json({ error: 'Traffic county not found' })
        }
        res.status(200).json(county)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch traffic county' })
      }
      break

    case 'PUT':
      try {
        const county = await TrafficCounty.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })
        if (!county) {
          return res.status(404).json({ error: 'Traffic county not found' })
        }
        res.status(200).json(county)
      } catch (error) {
        res.status(400).json({ error: 'Failed to update traffic county' })
      }
      break

    case 'DELETE':
      try {
        const county = await TrafficCounty.findByIdAndDelete(id)
        if (!county) {
          return res.status(404).json({ error: 'Traffic county not found' })
        }
        res.status(200).json({ message: 'Traffic county deleted successfully' })
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete traffic county' })
      }
      break

    default:
      res.status(405).json({ error: 'Method not allowed' })
  }
} 