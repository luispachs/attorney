import { Authorizarion } from "@/utils/Authorization";
import axios from "axios";
const auth = new Authorizarion();

const BASE_PATH = process.env.BASE_PATH_API??'/api';

const POST =async (url,body,isSecure=true)=>{
    let config = {
        headers:{  
        }
    }

    if(isSecure){
        config.headers["Authorization"] = `Bearer ${auth.token}`;
    }
    let response = await axios.post(`${BASE_PATH}/${url}`,body,config);
    return response;
}

const GET = async (url,params,isSecure=true)=>{

    let config = {
        params,
        headers:{  
        }
    }

    if(isSecure){
        config.headers["Authorization"] = `Bearer ${auth.token}`;
    }

    let response = await axios.get(`${BASE_PATH}/${url}`,);
    return response;
}

const DELETE = async (url,params,isSecure=true)=>{
    let config = {
        params,
        headers:{  
        }
    }

    if(isSecure){
        config.headers["Authorization"] = `Bearer ${auth.token}`;
    }

    let response = await axios.delete(`${BASE_PATH}/${url}`,);
    return response;
}

const PUT = async (url,body,isSecure=true)=>{
    let config = {
        headers:{  
        }
    }

    if(isSecure){
        config.headers["Authorization"] = `Bearer ${auth.token}`;
    }

    let response = await axios.put(`${BASE_PATH}/${url}`,body)
    return response;
}

export {GET,POST, DELETE,PUT}