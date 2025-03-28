import dbConnect from '@/lib/dbConnect'
import Attorney from '@/db-schemas/Attorney'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const attorneys = await Attorney.find({})
        res.status(200).json(attorneys)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch attorneys' })
      }
      break

    case 'POST':
      try {
        const attorney = await Attorney.create(req.body)
        res.status(201).json(attorney)
      } catch (error) {
        res.status(400).json({ error: 'Failed to create attorney' })
      }
      break

    default:
      res.status(405).json({ error: 'Method not allowed' })
  }
} 