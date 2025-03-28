import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { CountyForm } from "@/components/CountyForm";

function CountyDialog({dialogTitle,isOpen=false,closeHandle,closeToggle=null}){


    return <Dialog open={isOpen} onClose={closeHandle}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                        <CountyForm buttonLabel={dialogTitle.split(" ")[0]} closeToggle={closeToggle}/>
                </DialogContent>
            </Dialog>
}

export {CountyDialog};