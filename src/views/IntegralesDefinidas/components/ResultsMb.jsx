import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import shallow from 'zustand/shallow';
import { GridCards } from './ResultsPc';
import useIntegralsStore from '../../../stores/IntegralsStore';

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

function ResultsMb(props) {
  let {data} = props;
  //*****************MyCode************************** */
  const [iterationCount, setIterationCount] = React.useState(0);
  const handleSetIterationCount = (iterationCount) => {
    setIterationCount(iterationCount);
  }

  const { isLoading, hasError, errorMessage, isDirty, responseIntegrals } = useIntegralsStore(state => ({
    responseIntegrals: state.responseIntegrals,
    isLoading: state.isLoading,
    hasError: state.hasError,
    errorMessage: state.errorMessage,
    isDirty: state.isDirty
  }), shallow);

  //****************+material code*************************
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    if(newOpen){
      setOpen(newOpen);
    }else{
      setOpen(!open);
    }
  };

  React.useEffect(() => {
    if (responseIntegrals.length !== 0 || hasError) {
      setOpen(true);
    }
    if (!isDirty) {
    }
  }, [responseIntegrals, hasError, isDirty])

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
        onClose={toggleDrawer()}
        onOpen={toggleDrawer()}
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
          <Typography sx={{ p: 2, color: 'text.secondary' }}>Resultados</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <GridCards data={data} />
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

ResultsMb.propTypes = {
  window: PropTypes.func,
};

export default ResultsMb;
