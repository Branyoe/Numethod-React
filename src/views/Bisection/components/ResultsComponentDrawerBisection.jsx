import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TableComponentBisection from './TableComponentBisection';
import shallow from 'zustand/shallow';
import useBisectionStore from '../../../stores/BisectionStore';
import { IlustrationComponent } from '../../FakeRule/components/ResultsComponent';
import LoadinComponent from './LoadingComponent';

import initialIlustration from "../../../assets/initialIlustration.svg"
import errorIlustration from "../../../assets/errorIlustration.svg"

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

function ResultsComponentDrawerBisection(props) {

  //*****************MyCode************************** */
  const [iterationCount, setIterationCount] = React.useState(0);
  const handleSetIterationCount = (iterationCount) => {
    setIterationCount(iterationCount);
  }

  const { isLoading, hasError, errorMessage, isDirty, responseBisection } = useBisectionStore(state => ({
    responseBisection: state.responseBisection,
    isLoading: state.isLoading,
    hasError: state.hasError,
    errorMessage: state.errorMessage,
    isDirty: state.isDirty
  }), shallow);

  //****************+material code*************************
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  React.useEffect(() => {
    if(responseBisection.length !== 0 || hasError){
      setOpen(true)
      setIterationCount(0);
    }
    if(!isDirty){
      setIterationCount(0);
    }
  }, [responseBisection, hasError, isDirty])

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  //****************render¨+************************** */
  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(95% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            sm: "flex",
            md: "none"
          }
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: 'text.secondary' }}>{iterationCount} Iteraciones</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          {isDirty ?
            (isLoading ?
              <LoadinComponent />
              :
              (hasError ?
                <IlustrationComponent img={errorIlustration} message={errorMessage} />
                :
                <TableComponentBisection setIterationsOnFather={handleSetIterationCount} />
              )
            )
            :
            <IlustrationComponent img={initialIlustration} />
          }
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

ResultsComponentDrawerBisection.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResultsComponentDrawerBisection;
