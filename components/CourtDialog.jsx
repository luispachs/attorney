import { Dialog,DialogTitle,DialogContent,Button, TextField,Stack, Grid, MenuItem, Switch,FormControlLabel, Box  } from "@mui/material";
import { CourtForm } from "./CourtForm";
import { Component } from "react";
import { inject, observer } from "mobx-react";
import { POST } from "@/utils/http";
import ParseJson from '@/utils/ParseJson';



@inject('store')
@observer
class CourtDialog extends Component{
    state={
        isEnabled:false,
        alertModal:false,
        alertModalMessage:"",
        alert:""
    }
    handleSubmition =  async  (event) =>{
        event.preventDefault();
        try{
            let form = new FormData(event.currentTarget);
            this.setState({open:false})
            let res= await POST('/traffic-courts',ParseJson.ToJson(form))
            this.props.store.addCourt(res.data.data.court)
            this.state({   
                alertModal:true,
                alertModalMessage:res.data.message,
                alert:"success"
            })
        }catch(error){
            this.setState(
                {
                    alertModal:true,
                    alertModalMessage:error,
                    alert:"error"
                })
        }

        setTimeout(()=>{
            this.props.onClose();
        },1500)
    }


    render(){
        
       return <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogTitle >{this.props.title}</DialogTitle>
                <DialogContent>
                    <Box component={"form"} onSubmit={this.handleSubmition}> 
                    <CourtForm countyList={this.props.store.countiesList()} isEnabled={this.state.isEnabled} />
                    <Grid sx={{p:2,justifyContent:"center",alignItems:"end"}}>
                        <Button variant="contained" color="primary" type="submit">{this.props.title.split(' ')[0]}</Button>
                    </Grid>
                    </Box>
                </DialogContent>
            </Dialog>
    }
}

export {CourtDialog};