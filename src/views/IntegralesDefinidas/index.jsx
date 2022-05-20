import { Grid } from "@mui/material";
import { useEffect } from "react";
import useAppBarStore from "../../stores/AppBarStore";
import FromIntegralsComponent from "./components/FormIntegralsComponent";

export default function IntegralesDefinidasComponent() {

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
    setCurrentRoute("Integrales definidas")
  }, [])

  return (
      <Grid {...gridProps}>
        <Grid {...gridItemProps}>
          <FromIntegralsComponent/>
        </Grid>
      </Grid>
  );
}