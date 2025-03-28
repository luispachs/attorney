import TrafficCounty from "@/db-schemas/TrafficCounty";
import { InvalidHTTPMethodException,ElementAlreadyExistException,GenericException } from "@/utils/AttorneyErrors";
export default async function handler(req,res){
    let method = req.method;
    
    switch(method){
        case 'POST':
          try{
            let data = req.body;

            let trafficCountyModel = new TrafficCounty(data);
            let trafficCounty =await trafficCountyModel.save();

            return res.status(200).json({success:200,data:trafficCounty})

          }catch(error){
            if(error.code ==11000){
                return res.status(400).json(ElementAlreadyExistException);
            }else{
               
                return res.status(400).json(GenericException);
            }
          }
        default:
            return res.status(405).json(InvalidHTTPMethodException)
    }
}