import { TextField,Stack } from "@mui/material";

function ViolationForm(){
    return (
        <Stack sx={{p:4}} >
        <TextField variant="standard" id="name" label="Name" name="name" type="text"/>
        <TextField variant="standard" id="code" label="Code" name="code" type="text"/>
        <TextField variant="standard" id="description" label="Description" name="description"/>
     </Stack>
    );
}

export {ViolationForm};