import { Avatar, Grid, Paper, Typography } from "@mui/material";
import shallow from "zustand/shallow";
import useFakeRuleStore from "../../../../stores/FakeRuleStore";
import TableComponent from "./components/TableComponent";
import errorIlustration from "../../../../assets/errorIlustration.svg"
import initialIlustration from "../../../../assets/initialIlustration.svg"
import LoadinComponent from "../../../Bisection/components/LoadingComponent";

export default function ResultsComponent() {

  //props seccion
  const gridItemProps = {
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
  
  //my code
  const { isLoading, hasError, errorMessage, isDirty } = useFakeRuleStore(state => ({
    isLoading: state.isLoading,
    hasError: state.hasError,
    errorMessage: state.errorMessage,
    isDirty: state.isDirty
  }), shallow);

  return (
    <Grid
      {...gridItemProps}
    >
      {isDirty ?
        (isLoading ? 
          <LoadinComponent/> 
        : 
          (hasError ?
            <IlustrationComponent img={errorIlustration} message={errorMessage}/>
          : 
            <TableComponent container={Paper}/>
          )
        )
      :
        <IlustrationComponent img={initialIlustration}/>
      }
    </Grid>
  );
}

export function IlustrationComponent({img, message}) {
  return (
    <div style={{
      display: 'flex',
      height: '100%',
      width: '100%',
      flexDirection: "column",
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Avatar src={img} sx={{ width: "270px", height: "auto" }} variant="rounded" />
      {message && <Typography p={2}>{message}</Typography>}
    </div>
  );
}