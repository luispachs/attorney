import dbConnect from '@/lib/dbConnect'
import TrafficCourt from '@/models/TrafficCourt'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const courts = await TrafficCourt.find({}).populate('countyId')
        res.status(200).json(courts)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch traffic courts' })
      }
      break

    case 'POST':
      try {
        const court = await TrafficCourt.create(req.body)
        res.status(201).json(court)
      } catch (error) {
        res.status(400).json({ error: 'Failed to create traffic court' })
      }
      break

    default:
      res.status(405).json({ error: 'Method not allowed' })
  }
} 