import TrafficState from "@/db-schemas/TrafficState";
import { InvalidHTTPMethodException,ElementAlreadyExistException,GenericException } from "@/utils/AttorneyErrors";
export default async function handler(req,res){
    let method = req.method;
    
    switch(method){
        case 'POST':
          try{
            let data = req.body;
            let stateModel = new TrafficState(data);
            let state =await stateModel.save();
            return res.status(200).json({success:200,data:state})
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