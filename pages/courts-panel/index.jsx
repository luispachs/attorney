import { Box, Button, Grid, Typography,Card,CardContent,CardActions} from "@mui/material";
import { inject, observer } from "mobx-react";
import { CourtDialog } from "@/components/CourtDialog";
import React from "react";
import { BackButton } from "@/components/BackButton";
import { green , red} from "@mui/material/colors";
import { CourtFormUpdate } from "@/components/CourtFormUpdate";
import { DELETE } from "@/utils/http";

@inject('store')
@observer
class CourtPanel extends React.Component{
    state = {
        open:false,
        court: null
    }
    green=green
    red=red
    dialogTitle = "Add Court"

    handleOpenToggle= ()=>{

        this.setState({open:true});
    }
    handleCloseToggle = ()=>{
        
        this.setState({open:false})
    }

    componentDidMount(){       
       this.props.store.updateReferences();
    }

    deleteHandle =async (clickEvent)=>{
        clickEvent.stopPropagation()
        let id = clickEvent.target.dataset.id;
        let res =await DELETE(`/traffic-courts/${id}`);
        this.props.store.removeCourt(res.data.data.id);
    
    }
    editCourthandle =async (elemId)=>{
        let court=  this.props.store.courtById(elemId); 
        this.setState({court});
    }
    

    render(){
        return (<>
           
                <Grid container spacing={2} sx={{p:2}} size={12}>
                    <Grid item xs={12} md={4}>
                        <Box component={"section"}>
                            <Typography variant="h4" component={"h2"}>Courts</Typography>
                        </Box>
                    </Grid>
                    <Grid  item xs={12} md={8} sx={{display:"flex",justifyContent:"end",alignItems:"center"}} columns={20}>
                        <Grid item xs={12} md={2}>
                            <Button  variant="contained" color="primary" onClick={()=>this.handleOpenToggle()}>Add Court</Button>
                            <CourtDialog title={this.dialogTitle} open={this.state.open} onClose={this.handleCloseToggle}  />
                        </Grid>
                        <Grid item sx={{display:"flex",justifyContent:"center",alignItems:"center",ml:1}} xs={12} md={1} >
                            <BackButton/>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container size={{xs:12,md:12}} sx={{p:2}} direction={"row"}>
                <Grid item xs={12} md={this.state.court==null?12:6} sx={{p:4}}>
                {
                        this.props.store.courtsList().map((elem,index)=>{
              
                            
                            return (
                                <Card key={elem._id}  onClick={()=>this.editCourthandle(elem._id)} >
                                    
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
                                        <Typography component={"p"} sx={{textAlign:"start"}}>Address: <Typography component={"strong"} sx={{fontWeight:700}}>{elem.address}</Typography></Typography>
                                        <Typography component={"p"} sx={{textAlign:"start"}}>State: <Typography component={"strong"} sx={{fontWeight:700}}>{elem.trafficCounty.name} - {elem.trafficCounty.stateShortName}</Typography></Typography>

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
                {this.state.court != null && <Grid item xs={12}md={6}>
                        <CourtFormUpdate court={this.state.court} key={this.state.court._id}/>
                        </Grid>
                
                }
                
            </Grid>

            </>
            );
    }
}

export default CourtPanel;