
import { Stack,TextField,FormControlLabel,Box,Button, Switch,MenuItem,Grid} from "@mui/material";
import { inject, observer } from "mobx-react";
import { Component } from "react";
import ParseJson from '@/utils/ParseJson';
import { PUT } from "@/utils/http";
import { onSnapshot } from "mobx-state-tree";


@inject('store')
@observer
class CourtFormUpdate extends Component{
    state = {
        shortName:this.props.court.trafficCounty.stateShortName??"",
        name:this.props.court.name??"",
        enabled:this.props.court.enabled??false,
        trafficCounty: this.props.court.trafficCounty._id??"",
        address:this.props.court.address,
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
       console.log(auxState)
       let county = this.props.store.reference.countyById(changeEvent.target.value);
       console.log(county)

    }

    submitionHandle =async (formEvent)=>{
        formEvent.preventDefault();
        try{
            let formData = new FormData(formEvent.currentTarget)
            let body = ParseJson.ToJson(formData);
            body.enabled = body.enabled=="on"?true:false;
            let res =await PUT(`/traffic-courts/${body._id}`,body);
            let court = this.props.store.updateCourt(body._id,res.data.data.court)??null
            this.setState({court})
            this.state({
                county,     
                alertModal:true,
                alertModalMessage:res.data.message,
                alert:"success"
            })
        }catch(error){
            this.setState(
                {
                    county,alertModal:true,
                    alertModalMessage:res.data.error,
                    alert:"error"
                })
        }
        
    }

    changeName = (changeEvent)=>{
    
       this.setState({name:changeEvent.target.value})
    }
    changeAddress = (changeEvent)=>{;
        this.setState({address:changeEvent.target.value})
     }
    changeSwitch=()=>{
        let auxState = this.state;
        auxState.enabled = !this.state.enabled;
        this.setState(auxState)
    }

    render(){
   
        return (
            <Stack spacing={2} component={"form"} onSubmit={this.submitionHandle}>
                <Box>{this.state.alertModal && <Alert  severity={this.state.alert}>
                  {this.state.alertModalMessage}</Alert>}</Box>
            <TextField type="hidden" value={this.props.court._id} name="_id" id="_id" sx={{display:"none"}}/>
        
            <TextField name='name' id='name' value={this.state.name} onChange={this.changeName}/>
            <TextField name='address' id='address' value={this.state.address} onChange={this.changeAddress}/>
            <TextField name='stateShortName' id='state' value={this.state.shortName} aria-readonly/>
            <TextField name='trafficCounty' id="trafficCounty" select value={this.state.trafficCounty} onChange={this.selecthandle}>
                {
                    this.generateStateList()
                }
            </TextField>
            <FormControlLabel control={<Switch checked={this.state.enabled} name="enabled" id="enabled" onChange={this.changeSwitch}/>} label="Is Enabled?"/>
            <Box>
                <Button type='submit' variant='contained' color="primary">Update</Button>
            </Box>
        </Stack>
        );
    }
}

export {CourtFormUpdate}