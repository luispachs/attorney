
import { Stack,TextField,FormControlLabel,Box,Button, Switch,MenuItem,Grid} from "@mui/material";
import { inject, observer } from "mobx-react";
import { Component } from "react";
import ParseJson from '@/utils/ParseJson';
import { PUT } from "@/utils/http";
import { onSnapshot } from "mobx-state-tree";


@inject('store')
@observer
class CountyFormUpdate extends Component{
    state = {
        shortName:this.props.county.stateShortName??"",
        name:this.props.county.name??"",
        enabled:this.props.county.enabled??false,
        trafficState: this.props.county.trafficState??"",
        alertModal:false,
        alertModalMessage:"",
        alert:""
    }
    generateStateList =()=>{
        let stateList = this.props.store.reference.stateList();
        let selectMap =[];
        selectMap.push(<MenuItem key={0} value={""}>{"Select a Choice"}</MenuItem>)
        stateList.forEach((elem,index)=>{
            if(elem.enabled ==true){
                 selectMap.push(<MenuItem key={index+1} value={elem._id}>{`${elem.longName} - ${elem.shortName.toUpperCase()}`}</MenuItem>)
            }
        })
       
       return selectMap;
    }

    selecthandle =(changeEvent)=>{
       let auxState =this.state;
       auxState.selectedValue = changeEvent.target.value;
       let state = this.props.store.stateById(changeEvent.target.value);

       this.setState({
        selectedValue:changeEvent.target.value,
        shortName:state.shortName,
       });
    }

    submitionHandle =async (formEvent)=>{
        formEvent.preventDefault();
       try{
        let formData = new FormData(formEvent.currentTarget)
        let body = ParseJson.ToJson(formData);
        body.enabled = body.enabled=="on"?true:false;
        let res =await PUT(`/traffic-counties/${body._id}`,body);
        let county = this.props.store.updateCounty(body._id,res.data.data.county)??null
        this.setState(
            {
                county,     
                alertModal:true,
                alertModalMessage:res.data.message,
                alert:"success"
            })}
        catch(error){
            this.setState(
                {
                    county,alertModal:true,
                    alertModalMessage:res.data.error,
                    alert:"error"
                })
        }        
        
    }

    changeName = (changeEvent)=>{
       let auxState = this.state;
       auxState.name = changeEvent.target.value;
       this.setState(auxState)
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
            <TextField type="hidden" value={this.props.county._id} name="_id" id="_id" sx={{display:"none"}}/>
        
            <TextField name='name' id='name' value={this.state.name} onChange={this.changeName}/>
            <TextField name='stateShortName' id='state' value={this.state.shortName} aria-readonly/>
            <TextField name='trafficState' id="trafficState" select defaultValue={this.state.trafficState} onChange={this.selecthandle}>
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

export {CountyFormUpdate}