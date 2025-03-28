import dbConnect from '@/lib/dbConnect'
import TrafficCourt from '@/db-schemas/TrafficCourt'
import TrafficCounty from '@/db-schemas/TrafficCounty'

export default async function handler(req, res) {
  const { id } = req.query
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const court = await TrafficCourt.findById(id).populate('trafficCounty')
        console.log(court);
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
  
        let body = {
          name:req.body.name,
          address:req.body.address,
          enabled:req.body.enabled,
          TrafficCounty:req.body.TrafficCounty
        }
        const court = await TrafficCourt.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true
        })
        if (!court) {
          return res.status(404).json({ error: 'Traffic court not found' })
        }
        let courtWithCounty = await TrafficCourt.findById(id).populate("trafficCounty");
        
        res.status(200).json({message:"Update Successfull",data:{court:courtWithCounty}})
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
        res.status(200).json({ message: 'Traffic court deleted successfully',data:{id} })
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete traffic court' })
      }
      break

    default:
      res.status(405).json({ error: 'Method not allowed' })
  }
} 