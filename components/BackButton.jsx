import { Box,Link,Tooltip } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function BackButton(){
    return (
        <Box>
            <Tooltip title="Add County">
                  <Link href={"/attorneys-panel"}>
                    <ArrowBackIcon/>
                  </Link>
            </Tooltip>
        </Box>
    );
}

export {BackButton};