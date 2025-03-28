import { Box, Button, Grid, Typography,Card,CardContent,CardActions} from "@mui/material";
import { inject, observer } from "mobx-react";
import { ViolationDialog } from "@/components/ViolationDialog";
import React from "react";
import { BackButton } from "@/components/BackButton";
import { green , red} from "@mui/material/colors";
import { ViolationFormUpdate } from "@/components/ViolationFormUpdate";
import { DELETE } from "@/utils/http";

@inject('store')
@observer
class CourtPanel extends React.Component{
    state = {
        open:false,
        violation:null
    }
    green=green
    red=red
    dialogTitle = "Add Violation"

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
        let res =await DELETE(`/violations/${id}`);
        this.props.store.removeViolation(res.data.data.id);
    
    }
    editViolationHandle =async (elemId)=>{
       
        let violation=  this.props.store.violationById(elemId); 
        this.setState({violation});
    }
    

    render(){
        return (<>
           
                <Grid container spacing={2} sx={{p:2}} size={12}>
                    <Grid item xs={12} md={4}>
                        <Box component={"section"}>
                            <Typography variant="h4" component={"h2"}>Violations</Typography>
                        </Box>
                    </Grid>
                    <Grid  item xs={12} md={8} sx={{display:"flex",justifyContent:"end",alignItems:"center"}} columns={20}>
                        <Grid item xs={12} md={2}>
                            <Button  variant="contained" color="primary" onClick={()=>this.handleOpenToggle()}>Add Violation</Button>
                            <ViolationDialog title={this.dialogTitle} open={this.state.open} onClose={this.handleCloseToggle}  />
                        </Grid>
                        <Grid item sx={{display:"flex",justifyContent:"center",alignItems:"center",ml:1}} xs={12} md={1} >
                            <BackButton/>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container size={{xs:12,md:12}} sx={{p:2}} direction={"row"}>   

                    <Grid item xs={12} md={this.state.violation==null?12:6} sx={{p:4}}>
                                    {
                                            this.props.store.violationsList().map((elem,index)=>{
                                  
                                                
                                                return (
                                                    <Card key={elem._id}  onClick={()=>this.editViolationHandle(elem._id)} >
                                                        
                                                        <CardContent onClick={()=>this.editViolationHandle(elem._id)} >
                                                            <Typography component={"p"} sx={{textAlign:"start"}}>{elem.name} </Typography>
                                                            <Typography component={"p"} sx={{textAlign:"start"}}>Description: <Typography component={"strong"} sx={{fontWeight:700}}>{elem.description}</Typography></Typography>
                                                            <Typography component={"p"} sx={{textAlign:"start"}}>Points: <Typography component={"strong"} sx={{fontWeight:700}}>{elem.Points}</Typography></Typography>
                                                            <Typography component={"p"} sx={{textAlign:"start"}}>Code: <Typography component={"strong"} sx={{fontWeight:700}}>{elem.code}</Typography></Typography>
                    
                                                        </CardContent>
                                                        <CardActions onClick={()=>this.editViolationHandle(elem._id)} data-id={elem._id}>
                                                    
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
                                    {this.state.violation != null && <Grid item xs={12}md={6}>
                                            <ViolationFormUpdate violation={this.state.violation} key={this.state.violation._id}/>
                                            </Grid>
                                    
                                    }

                </Grid>

            </>
            );
    }
}

export default CourtPanel;