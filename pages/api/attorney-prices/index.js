import dbConnect from '@/lib/dbConnect'
import AttorneyPrice from '@/models/AttorneyPrice'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const prices = await AttorneyPrice.find({})
          .populate('attorneyId')
          .populate('courtId')
          .populate('countyId')
          .populate('violationId')
        res.status(200).json(prices)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch attorney prices' })
      }
      break

    case 'POST':
      try {
        const price = await AttorneyPrice.create(req.body)
        res.status(201).json(price)
      } catch (error) {
        res.status(400).json({ error: 'Failed to create attorney price' })
      }
      break

    default:
      res.status(405).json({ error: 'Method not allowed' })
  }
} 