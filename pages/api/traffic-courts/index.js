import dbConnect from '@/lib/dbConnect'
import TrafficCourt from '@/db-schemas/TrafficCourt'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const courts = await TrafficCourt.find({}).populate('trafficCounty').exec()
        res.status(200).json(courts)
      } catch (error) {
   
        res.status(500).json({ error: 'Failed to fetch traffic courts' })
      }
      break

    case 'POST':
      try {
        const court = await TrafficCourt.create(req.body)
        let courtWithCounty = await TrafficCourt.findById(court._id).populate("trafficCounty")
        res.status(201).json({message:"Creation Successfull",data:{court:courtWithCounty}})
      } catch (error) {
       
        res.status(400).json({ error: 'Failed to create traffic court' })
      }
      break

    default:
      res.status(405).json({ error: 'Method not allowed' })
  }
} 