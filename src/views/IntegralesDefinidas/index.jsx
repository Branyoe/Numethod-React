import { Grid } from "@mui/material";
import { useEffect } from "react";
import shallow from "zustand/shallow";
import useAppBarStore from "../../stores/AppBarStore";
import useIntegralsStore from "../../stores/IntegralsStore";
import FromIntegralsComponent from "./components/FormIntegralsComponent";
import ResultsMb from "./components/ResultsMb";
import ResultsPc from "./components/ResultsPc";

export default function IntegralesDefinidasComponent() {

  //****props definition */
  const gridProps = {
    container: true,
    colums: 12,
    height: "100%"
  }

  const gridItemFormProps = {
    item: true,
    xs: 12,
    sm: 12,
    md: 3,
    lg: 4,
    xl: 4
  }
  const gridItemResultsProps = {
    item: true,
    xs: 12,
    sm: 12,
    md: 9,
    lg: 8,
    xl: 8,
    sx: {
      display: {
        xs: "none",
        md: "grid"
      },
      pl: {
        xs: 0,
        md: 1
      },
      pr: {
        xs: 0,
        md: 1
      }
    }
  }

  //logix seccion

  const { setCurrentRoute } = useAppBarStore(state => ({
    setCurrentRoute: state.setCurrentRoute
  }))

  const { responseIntegrals } = useIntegralsStore(state => ({
    responseIntegrals: state.responseIntegrals,
    hasError: state.hasError,
    errorMessage: state.errorMessage,
    isDirty: state.isDirty,
    isLoading: state.isLoading
  }), shallow);

  useEffect(() => {
    setCurrentRoute("Integrales definidas");
  }, [])

  return (
    <Grid {...gridProps}>
      <Grid {...gridItemFormProps}>
        <FromIntegralsComponent />
      </Grid>
      <Grid {...gridItemResultsProps}>
        <ResultsPc data={responseIntegrals} />
      </Grid>
      <ResultsMb data={responseIntegrals} />
    </Grid>
  );
}