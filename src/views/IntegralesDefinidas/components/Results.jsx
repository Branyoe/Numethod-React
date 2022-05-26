import { Box, Paper, Typography } from "@mui/material";
import useIntegralsStore from "../../../stores/IntegralsStore";
import ResultsPc from "./ResultsPc";

export default function Results(){
  const {responseIntegrals} = useIntegralsStore(state => ({
    responseIntegrals: state.responseIntegrals
  }));

  return (
    <Box
      p={2}
    >
      <ResultsPc data={responseIntegrals} />
    </Box>
  );
}