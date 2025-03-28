
import { Stack,TextField,Box,Button, MenuItem,Alert} from "@mui/material";
import { inject, observer } from "mobx-react";
import { Component } from "react";
import ParseJson from '@/utils/ParseJson';
import { PUT } from "@/utils/http";
import { onSnapshot } from "mobx-state-tree";


@inject('store')
@observer
class ViolationFormUpdate extends Component{
    state = {

        name:this.props.violation.name??"",
        points:this.props.violation.points??0,
        description: this.props.violation.description??"",
        code:this.props.violation.code,
        alertModal:false,
        alertModalMessage:"",
        alert:""
    }
    generateStateList =()=>{
        let stateList = this.props.store.reference.countiesList();
        let selectMap =[];
        stateList.forEach((elem,index)=>{
            if(elem.enabled ==true){
                 selectMap.push(<MenuItem key={index+1} value={elem._id}>{`${elem.name} - ${elem.stateShortName.toUpperCase()}`}</MenuItem>)
            }
        })
       
       return selectMap;
    }

    selecthandle =(changeEvent)=>{
       let auxState =this.state;
       auxState.selectedValue = changeEvent.target.value;
       let county = this.props.store.reference.countyById(changeEvent.target.value);

    }

    submitionHandle =async (formEvent)=>{
        formEvent.preventDefault();
        try{
            let formData = new FormData(formEvent.currentTarget)
            let body = ParseJson.ToJson(formData);
            body.enabled = body.enabled=="on"?true:false;
            let res =await PUT(`/violations/${body._id}`,body);
          
            let violation = this.props.store.updateViolation(body._id,res.data.data.violation)??null
            this.state({
                violation,
                alertModal:true,
                alertModalMessage:res.data.message,
                alert:"success"
            })
        }catch(error){
            console.log(error)
            this.setState(
                {
                    alertModal:true,
                    alertModalMessage:error,
                    alert:"error"
                })
        }
        
    }

    changeName = (changeEvent)=>{
    
       this.setState({name:changeEvent.target.value})
    }
    changeCode = (changeEvent)=>{;
        this.setState({code:changeEvent.target.value})
     }
     changeDescription = (changeEvent)=>{;
        this.setState({description:changeEvent.target.value})
     }
    changeSwitch=()=>{
        let auxState = this.state;
        auxState.enabled = !this.state.enabled;
        this.setState(auxState)
    }

    render(){
   
        return (
            <Stack spacing={2} component={"form"} onSubmit={this.submitionHandle}>

            <TextField type="hidden" value={this.props.violation._id} name="_id" id="_id" sx={{display:"none"}}/>
            <TextField name='name' id='name' label="Name" value={this.state.name} onChange={this.changeName}/>
            <TextField name='code' id='code' label="Code" value={this.state.code} onChange={this.changeCode}/>
            <TextField name='description' id='description' label="Description" type="text" value={this.state.description} onChange={this.changeDescription}/>
            <Box>
                <Button type='submit' variant='contained' color="primary">Update</Button>
            </Box>
        </Stack>
        );
    }
}

export {ViolationFormUpdate}