import { Grid, Typography,Box ,Button,Stack, Modal, Tooltip, TextField, FormControlLabel, Switch,Alert, Card, CardContent, CardActions } from '@mui/material';
import { CountyDialog } from '@/components/ContyDialog';
import React, { createRef } from  'react';
import { inject, observer } from 'mobx-react';
import { BackButton } from '@/components/BackButton';
import AddIcon from '@mui/icons-material/Add';
import ParseJson from "@/utils/ParseJson";
import { green, red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import { DELETE } from '@/utils/http';
import { CountyFormUpdate } from '@/components/CountyFormUpdate';



@inject('store')
@observer
class CountyPanel extends React.Component {
    countyRef = createRef({county:null})
    state ={
        open:false,
        showModal:false,
        isEnabled:false,
        alertModal:false,
        alertModalMessage:"",
        alert:"",
        county:null
    }
    green = green

    handleShowModal = ()=>{
        let auxstate = this.state;
        auxstate.showModal = true;
        this.setState(auxstate);
        
    }
    handleCloseModal = ()=>{
        let auxstate = this.state;
        auxstate.showModal = false;
        this.setState(auxstate);
    }
 
    handleToggleCounty = ()=>{
            let auxState =this.state; 
            auxState.open =true;
            this.setState(auxState)
        }

    handleCloseToggleCounty = ()=>{
            let auxState =this.state; 
            auxState.open =false
            this.setState(auxState)
        }
    handleSwitchEnable = ()=>{
        let auxState = this.state;
        auxState.isEnabled =!this.state.isEnabled;
        this.setState(auxState);
    }

    handleSubmitionState = async (formEvent)=>{
        formEvent.preventDefault();
        let data = ParseJson.ToJson(new FormData(formEvent.currentTarget));
        let auxState = this.state;
        data.enabled=="on"?data.enabled =true:data.enabled=false;

        try{
           
            let res = await this.props.store.createState(data);
            let state = {
                _id:res.data._id,
                shortName:res.data.shortName,
                longName:res.data.longName,
                enabled:res.data.enabled
            }
            this.props.store.addState(state);
            auxState.alert="success",
            auxState.alertModal=true,
            auxState.alertModalMessage =`The State ${res.data._id} was create`
            this.setState(auxState)
        }catch(error){
            auxState.alert="error",
            auxState.alertModal=true,
            auxState.alertModalMessage =`The State wasn't create: ${error.response.data.message}`
            this.setState(auxState)
        }
        setTimeout(()=>{
            handleCloseModal()
        },1500)
       
    }


    deleteHandle =async (clickEvent)=>{
        clickEvent.stopPropagation()
        let id = clickEvent.target.dataset.id;
        let res =await DELETE(`/traffic-counties/${id}`);
        this.props.store.removeCounty(res.data.data.id);

    }
    editCountyhandle =async (elemId)=>{
        let auxState = this.state;
        let county =  this.props.store.reference.countyById(elemId); 
        auxState.county = county;
        this.setState(auxState);
    }


    render(){
        return (<>

            <Grid container spacing={2} sx={{p:2}} size={{xs:12,md:12}}>
                <Modal open={this.state.showModal} onClose={this.handleCloseModal} sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <Grid item sx={{background:"#fff",display:"flex",justifyContent:"center",alignItems:"center",p:2, borderRadius:4}} xs={9} md={4} >
                            <Stack direction={"column"} spacing={3} component="form" onSubmit={this.handleSubmitionState}>
                                    <Box>{this.state.alertModal && <Alert  severity={this.state.alert}>
                                            {this.state.alertModalMessage}</Alert>}</Box>
                                    <Typography component={"h2"} variant='h5' textAlign={"center"}>Add State</Typography>
                                    <TextField type='text' name='longName' id='name' label="Name"/>
                                    <TextField type='text' name='shortName' id='shortName' label="Short Name"/>
                                    <FormControlLabel control={<Switch checked={this.state.isEnabled} onClick={this.handleSwitchEnable}/>}label="isEnable" name='enabled' id='enable'/>
                                    <Button variant='contained' color='primary' type='submit'>Add</Button>
                            </Stack>
                        </Grid>
                </Modal>
                <Grid item xs={12} md={4}>
                    <Typography component={"h2"} variant='h4'>County</Typography>
                </Grid>
                <Grid item xs={12} md={8}  sx={{display:"flex",justifyContent:"end",alignItems:"center", gap:1}} columns={20}>
                    <Grid item sx={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center", p:1}} xs={12} md={2}>
                            <Box>
                                <Button  variant="contained" color="primary" onClick={this.handleToggleCounty}>Add County</Button>
                            </Box>
                        <CountyDialog dialogTitle="Add County" isOpen={this.state.open} closeHandle={this.handleCloseToggleCounty} closeToggle={this.handleCloseToggleCounty} /> 
                    </Grid>
                    <Grid item sx={{display:"flex",justifyContent:"center",alignItems:"center"}} xs={12} md={1}>
                        <Tooltip title="Add State">
                            <Button onClick={this.handleShowModal}>
                                <AddIcon/>
                            </Button>
                        </Tooltip>
                    </Grid>
                    <Grid item sx={{display:"flex",justifyContent:"center",alignItems:"center"}} xs={12} md={1}>
                        <BackButton/>
                    </Grid>
                </Grid>
               
            </Grid>
            <Grid container size={{xs:12,md:12}} sx={{p:2}}>
                <Grid item xs={12} md={this.state.county==null?12:6} sx={{p:4}}>
                {
                        this.props.store.countiesList().map((elem,index)=>{
                            return (
                                <Card key={elem._id}  onClick={()=>this.editCountyhandle(elem._id)} >
                                    <CardContent onClick={this.editCountyhandle} >
                                        <Typography component={"p"} sx={{textAlign:"start"}}>{elem.name} <Typography component={"strong"} sx={
                                            {
                                                borderRadius:2,
                                                fontSize:10,
                                                backgroundColor:elem.enabled?green[200]:red[200],
                                                color:elem.enabled?green[900]:red[900],
                                                width:50,
                                                display:"inline-block",
                                                textAlign:"center"
                                            }
                                        }>{elem.enabled==true?"ACTIVE":"INACTIVE"}</Typography></Typography>
                                        <Typography component={"p"} sx={{textAlign:"start"}}>Short Name: <Typography component={"strong"} sx={{fontWeight:700}}>{elem.stateShortName}</Typography></Typography>
                                    </CardContent>
                                    <CardActions onClick={this.editCountyhandle} data-id={elem._id}>
                                
                                                <Button onClick={this.deleteHandle} data-id={elem._id} 
                                                    sx={{
                                                        borderRadius:2,
                                                        background:red[200],
                                                        color:red[900]
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            
                                    </CardActions>
                                </Card>
                            );
                        })
                    }
                </Grid>
                {this.state.county != null && <Grid item xs={12}md={6}>
                        <CountyFormUpdate county={this.state.county} key={this.state.county._id}/>
                        </Grid>
                
                }
                
            </Grid>
            </>
        );
    }
}

export default CountyPanel;