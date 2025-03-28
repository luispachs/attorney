import {expect, jest, test,describe} from '@jest/globals';
import FormatSubmition from "../../utils/ParseJson";

let formData1 = new FormData();
formData1.append("name","test name 1")
formData1.append("address","test address 1");
formData1.append("id",1);

let formData2 = new FormData();
formData1.append("name","test name 2")
formData1.append("address","test address 2");
formData1.append("id",2);

let formData3 = new FormData();
formData1.append("name","test name 3")
formData1.append("address","test address 3");
formData1.append("phone","3209345419");
formData1.append("id",3);

let formData4 = new FormData();
formData1.append("name","test name 4")
formData1.append("address","test address 4");
formData1.append("phone","3209345420");
formData1.append("id",4);

let formData5 = new FormData();
formData1.append("name","test name 5")
formData1.append("phone","3209345421");
formData1.append("id",5);

const formsData =[
    {
        expect:{name:"test name 1",address:"test address 1",id:1},
        data: formData1
    },
    {
        expect:{name:"test name 2",address:"test address 2",id:2},
        data: formData2
    },
    {
        expect:{name:"test name 3",address:"test address 3",id:3,phone:"3209345419"},
        data: formData3
    },
    {
        expect:{name:"test name 4",address:"test address 4",id:4,phone:"3209345420"},
        data: formData4
    },
    {
        expect:{name:"test name 5",id:5,phone:"3209345421"},
        data: formData5
    },
];

const objectJsons =[

]

describe("Test ParseJson.ToFormData ",()=>{
    formsData.forEach((elem,index)=>{
        test(`Start test Form Data ${index}`,()=>{
            expect(FormatSubmition.ToFormData(elem.expect)).not.toBe(elem.data);
        })
    })
})


describe("Test ParseJson.ToJson ",()=>{
    formsData.forEach((elem,index)=>{
        test(`Start test Form Data ${index}`,()=>{
            expect(FormatSubmition.ToFormData(elem.data)).not.toBe(elem.expect);
        })
    })
})