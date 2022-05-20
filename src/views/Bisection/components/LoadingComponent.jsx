import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

export default function LoadinComponent(){

  return (
    <Box height="100%" display="flex" justifyContent="center" alignItems="center">
      <CircularProgress size={80}/>
    </Box>
  );
}