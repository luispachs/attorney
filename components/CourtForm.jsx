import { TextField,Stack, MenuItem, Switch,FormControlLabel } from "@mui/material";
import { useState } from "react";
function CourtForm({countyList=[],isEnabled}){
    const [enabled,setEnabled] = useState(isEnabled);
    const [county,setCounty]=useState("")
    const enabledHandle  = (e)=>{
        setEnabled(!enabled);
    }

    const selecthandle = (e)=>{
        setCounty(e.target.value)
    }

    return (
        <Stack sx={{p:4}} >
        <TextField variant="standard" id="name" label="Name" name="name"/>
        <TextField variant="standard" id="address" label="Address" name="address"/>
        <TextField select variant="standard" label="County" id="trafficCounty" name="trafficCounty" helperText="Choose a County" value={county} onChange={selecthandle}>
            {
                countyList.map(
                    (elem,index)=>{
                    return <MenuItem  key={index} value={elem._id}>{elem.name}</MenuItem>
                    }
                )
            }
        </TextField>
        <FormControlLabel control={<Switch checked={enabled} label="Is Enable" onClick={enabledHandle}/>}/>
     </Stack>
    );
}

export {CourtForm};