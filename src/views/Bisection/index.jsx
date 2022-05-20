import { Grid } from "@mui/material";
import { useEffect } from "react";
import useAppBarStore from "../../stores/AppBarStore";
import FormComponent from "./components/FromComponentBisection";

import ResultsComponentBisection from "./components/ResultsComponentBisection";
import ResultsComponentDrawerBisection from "./components/ResultsComponentDrawerBisection";

export default function BisectionComponent() {

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
    setCurrentRoute("Biseccíon")
  }, [])

  return (
      <Grid {...gridProps}>
        <ResultsComponentDrawerBisection />
        <Grid {...gridItemProps}>
          <FormComponent />
        </Grid>
        <ResultsComponentBisection/>
      </Grid>
  );
}