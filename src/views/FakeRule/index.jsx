import { Grid } from "@mui/material";
import { useEffect } from "react";
import useAppBarStore from "../../stores/AppBarStore";
import FormComponent from "./components/FormComponent";

import ResultsComponent from "./components/ResultsComponent";
import ResultsComponentDrawer from "./components/ResultsComponentDrawer";

export default function FakeRuleComponent() {

  const gridProps = {
    container: true,
    colums: 12,
    height: "100%"
  }

  const gridItemProps = {
    item: true,
    xs: 12,
    sm: 12,
    md: 3,
    lg: 4,
    xl: 4
  }

  const { setCurrentRoute } = useAppBarStore(state => ({
    setCurrentRoute: state.setCurrentRoute
  }))

  useEffect(() => {
    setCurrentRoute("Regla falsa modificada")
  }, [])

  return (
    <Grid {...gridProps}>
      <ResultsComponentDrawer />
      <Grid {...gridItemProps}>
        <FormComponent />
      </Grid>
      <ResultsComponent />
    </Grid>

  );
}