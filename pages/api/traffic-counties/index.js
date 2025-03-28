import dbConnect from '@/lib/dbConnect'
import TrafficCounty from '@/db-schemas/TrafficCounty'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const counties = await TrafficCounty.find({})
        res.status(200).json(counties)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch traffic counties' })
      }
      break

    case 'POST':
      try {
        const county = await TrafficCounty.create(req.body)
        res.status(201).json(county)
      } catch (error) {
        res.status(400).json({ error: 'Failed to create traffic county' })
      }
      break

    default:
      res.status(405).json({ error: 'Method not allowed' })
  }
} 