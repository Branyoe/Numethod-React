import { Alert, AlertTitle } from "@mui/material";

export default function MyAlert({ msg }) {

  return (
    <Alert severity="error" sx={{margin: "30px"}}>
      <AlertTitle>Error</AlertTitle>
      {msg}
    </Alert>
  );
}