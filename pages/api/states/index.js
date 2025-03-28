import TrafficState from "@/db-schemas/TrafficState";
import { InvalidHTTPMethodException } from "@/utils/AttorneyErrors";

export default async function handler(req,res){
    let method = req.method;
    switch(method){
        case 'GET':
            let trafficState =await TrafficState.find({});
            return res.status(200).json(trafficState);
    
        default:
            res.status(405).json(InvalidHTTPMethodException)
    }
    
}