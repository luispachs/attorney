import TrafficCounty from "@/db-schemas/TrafficCounty";
import TrafficState from "@/db-schemas/TrafficState";
import { InvalidHTTPMethodException,UnableForDeleteException,CannotDeleteException, GenericException} from "@/utils/AttorneyErrors";
import { Traffic } from "@mui/icons-material";
export default async function handle(req,res){
    let method = req.method;
    co
    switch(method){
        case "DELETE":
                let {id} = req.query
                try{
                    let counties = await TrafficCounty.find({
                        where:{
                            trafficState:id
                        }
                    });
                  
                    if(counties.length > 0){
                        return res.status(400).json(UnableForDeleteException)
                    }
                    let state = await TrafficState.findByIdAndDelete(id);
                    if(!state){
                        return res.status(400).json(UnableForDeleteException)
                    }
                    return res.status(200).json({message:"success",data:{id}})
                }
                catch(error){
                    return res.status(405).json(GenericException)
                }

        default:
            return res.status(405).json(InvalidHTTPMethodException)
    }
}