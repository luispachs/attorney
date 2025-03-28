import { inject, observer } from "mobx-react";
import { Component, createRef } from "react";
import ParseJson from "@/utils/ParseJson"
import { Box, TextField, FormControlLabel, Switch,Stack,Button,MenuItem,Alert } from "@mui/material";
import { POST } from "@/utils/http";

@inject('store')
class CountyForm extends Component{
    state={
        enabled:this.props.enabled ?? false,
        selectedValue: this.props.sValue??"" ,
        shortNameState:"",
        alertModal:false,
        alertModalMessage:"",
        alert:""
    }



    handleEnable=()=>{
        let auxState = this.state;
        auxState.enabled = !this.state.enabled;
        this.setState(auxState);
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

    submitionHandle =async (formEvent)=>{
        try{
            formEvent.preventDefault();
            let formData = new FormData(formEvent.currentTarget);
            let body = ParseJson.ToJson(formData);
            body.enabled = body.enabled=='on'?true:false;
            let res =await POST('/traffic-counties/create',body);
            this.props.store.addCounty(res.data.data)
            setTimeout(()=>{
                this.props.closeToggle()
            },1500)
        }catch(error){
            let auxState = this.state;
            auxState.alert="error",
            auxState.alertModal=true,
            auxState.alertModalMessage =`The State wasn't create: ${error.response.data.message}`
            this.setState(auxState)
        }

        setTimeout(()=>{
            this.props.closeToggle()
        },1500)
    }
    selectHandle = (changeEvent)=>{
        let auxState = this.state;
        auxState.selectedValue = changeEvent.target.value;
        let state = this.props.store.stateById(changeEvent.target.value);
        auxState.shortNameState =state.shortName
        this.setState(auxState);
    }

    render(){
       
        return (
            <Box component="form" onSubmit={this.submitionHandle}>
                <Stack direction={"column"} spacing={3} >
                    <Box>{this.state.alertModal && <Alert  severity={this.state.alert}>
                                                                {this.state.alertModalMessage}</Alert>}</Box>
                    <TextField name="name" id="name" type="text" label="Name" />
    
                    <TextField name="trafficState" select id="trafficState"  label="State" value={this.state.selectedValue} 
                        onChange={this.selectHandle}>  
                        {this.generateStateList()}
                    </TextField>

                    <TextField name="stateShortName" id="stateShortName" type="text" label="State Short Name" value={this.state.shortNameState}   aria-readonly/>

                    <FormControlLabel control={<Switch id="state" name="state" checked={this.state.enabled} onChange={this.handleEnable}/>} label="Is Enabled?"/>

                    <Box>
                        <Button variant="contained" color="primary" type="submit">{this.props.buttonLabel}</Button>
                    </Box>
                </Stack>
            </Box>
            )
    }
}

export {CountyForm};