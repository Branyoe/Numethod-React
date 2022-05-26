import { Box, Grid, Stack, Typography } from "@mui/material";
import { MathComponent } from "mathjax-react";
import shallow from "zustand/shallow";
import useIntegralsStore from "../../../stores/IntegralsStore";
import { IlustrationComponent } from "../../FakeRule/components/ResultsComponent";
import initialIlustration from "../../../assets/initialIlustration.svg";
import errorIlustration from "../../../assets/errorIlustration.svg";
import LoadinComponent from "../../Bisection/components/LoadingComponent";
import myStyles from "./styleResultPc.css"

export default function ResultsPc({ data }) {
  return (
    <Box
      pr={2}
      pl={2}
    >
      <GridCards data={data}></GridCards>
    </Box>
  );
}

//****************************** */
// import * as React from 'react';



export function GridCards({ data }) {

  const gridItemIlustrationProps = {
    item: true,
    xs: 12,
    height: "100%",
    sx: {
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

  const { hasError, errorMessage, isLoading, isDirty } = useIntegralsStore(state => ({
    responseIntegrals: state.responseIntegrals,
    hasError: state.hasError,
    errorMessage: state.errorMessage,
    isDirty: state.isDirty,
    isLoading: state.isLoading
  }), shallow);

  return (
    <>
      {isDirty ?
        (isLoading ?
          <LoadinComponent />
          :
          (hasError ?
            <Grid {...gridItemIlustrationProps}>
              <IlustrationComponent img={errorIlustration} message={errorMessage} />
            </Grid>
            :
            <Grid container spacing={2}>
              <Grid item xl={6} md={6} sm={12} xs={12}>
                <CardResult title="Decimal" content={data.resultFloat} textSize="1.5rem" />
              </Grid>
              <Grid item xl={6} md={6} sm={12} xs={12}>
                <CardResult title="Fracción" content={data.resultFrac} textSize="1.5rem" />
              </Grid>
              <Grid item xl={12} xs={12}>
                <CardResult title="Integral" content={<MathComponent tex={String.raw`${data.process}`} textSize="1.5rem" />} />
              </Grid>
            </Grid>
          )
        )
        :
        <Grid {...gridItemIlustrationProps}>
          <IlustrationComponent img={initialIlustration} />
        </Grid>
      }
    </>
  );
}

function CardResult({ title = "", content = "...", textSize = "auto" }) {
  return (
    <Box p={1}>
      <Stack>
        <Typography
          variant="subtitle2"
        >
          {title}
        </Typography>
      </Stack>
      <Box
        height={90}
        borderRadius="10px"
        border={"2px solid #176dc3"}
        display={"flex"}
        alignItems={"center"}
        overflow="scroll"
      >
      <Typography
        variant={"subtitle2"}
        fontSize={textSize}
        ml={2}
        mr={2}
      >
        {content}
      </Typography>
    </Box>
    </Box >
  );
}
