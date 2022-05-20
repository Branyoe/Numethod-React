import { Grid, Paper } from "@mui/material";
import shallow from "zustand/shallow";
import useBisectionStore from "../../../stores/BisectionStore";
import { IlustrationComponent } from "../../FakeRule/components/ResultsComponent";
import errorIlustration from "../../../assets/errorIlustration.svg"
import LoadinComponent from "./LoadingComponent";
import TableComponentBisection from "./TableComponentBisection";
import initialIlustration from "../../../assets/initialIlustration.svg"

export default function ResultsComponentBisection() {

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

  //myCode
  const { isLoading, hasError, errorMessage, isDirty } = useBisectionStore(state => ({
    responseBisection: state.responseBisection,
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
            <TableComponentBisection container={Paper}/>
          )
        )
      :
        <IlustrationComponent img={initialIlustration}/>
      }
    </Grid>
  );
}