import { Dialog,DialogTitle,DialogContent,Button, TextField,Stack, Grid, MenuItem, Switch,FormControlLabel, Box  } from "@mui/material";
import { ViolationForm } from "./ViolationForm";
import { Component } from "react";
import { inject, observer } from "mobx-react";
import { POST } from "@/utils/http";
import ParseJson from '@/utils/ParseJson';



@inject('store')
@observer
class ViolationDialog extends Component{
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
            let res= await POST('/violations',ParseJson.ToJson(form))
            this.props.store.addViolation(res.data.data.violation)
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
                    <ViolationForm />
                    <Grid sx={{p:2,justifyContent:"center",alignItems:"end"}}>
                        <Button variant="contained" color="primary" type="submit">{this.props.title.split(' ')[0]}</Button>
                    </Grid>
                    </Box>
                </DialogContent>
            </Dialog>
    }
}

export {ViolationDialog};