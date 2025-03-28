export default class FormatSubmition{

    static ToJson(formData){
        let json ={};
        for(let item of formData.entries()){
            json[item[0]] =item[1]
        }

        return json;
    }


    static ToFormData(json){
        let formData = new FormData();
        let keys = Object.keys(json);

        for(let key of keys){
            formData.append(key,json[key])
        }
        return formData
    }


}