import dbConnect from '@/lib/dbConnect'
import AttorneyPrice from '@/db-schemas/AttorneyPriceMap'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const prices = await AttorneyPrice.find({})
          .populate('attorney')
          .populate({path:"court",populate:{path:'trafficCounty'}})
          .populate({path:'county'})
          .populate({path:'violation'})
        res.status(200).json(prices)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch attorney prices' })
      }
      break

    case 'POST':
      try {

        let body = {
          price:req.body.price,
          pointsRange:req.body.pointsRange,
          attorney:req.body.attorney,
          court:req.body.court==""?null:req.body.court,
          violation:req.body.violation==""?null:req.body.violation,
          county:req.body.county==""?null:req.body.county,
        }
        const price = await AttorneyPrice.create(body)
        const priceItem = await AttorneyPrice.findById(price._id)
                                .populate('attorney')
                                .populate({path:"court",populate:{path:'trafficCounty'}})
                                .populate({path:'county'})
                                .populate({path:'violation'})
        res.status(201).json(priceItem)
      } catch (error) {
       
        res.status(400).json({ error: 'Failed to create attorney price' })
      }
      break

    default:
      res.status(405).json({ error: 'Method not allowed' })
  }
} 